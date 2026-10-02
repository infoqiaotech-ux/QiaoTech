/**
 * Medallion asset pipeline — cleaner approach using sharp compositing
 * Avoids raw buffer manipulation; uses negate+threshold pipeline instead.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = 'd:/QiaoTech_website/assets/logo/original.png';
const OUT = 'd:/QiaoTech_website/assets/logo';

async function run() {
  const meta = await sharp(SRC).metadata();
  console.log(`Source: ${meta.width}x${meta.height} hasAlpha:${meta.hasAlpha}`);

  // Strategy: the source already has alpha. The "background" dark pixels need to go.
  // 1. Flatten to white bg to inspect how dark the bg is vs logo.
  // 2. Use threshold on luma to build an alpha mask.
  // 3. Apply mask, trim, square-pad, export.

  // Create luma-based mask: pixels lighter than threshold get alpha=255, dark=0
  // The logo has rich gold/bronze colours (high R, moderate G, low B)
  // Background is near-black #060d24 (rgb ~6,13,36)
  // Threshold: any pixel where max(r,g,b) > 80 is "logo content"

  // Step 1: Get original as PNG with alpha
  const origBuf = await sharp(SRC).ensureAlpha().png().toBuffer();

  // Step 2: Create the mask image using threshold on the source (high-pass)
  // Extract just the luma channel to create a mask
  const maskBuf = await sharp(SRC)
    .greyscale()
    .threshold(60)   // pixels > 60 luma → white (keep); < 60 → black (discard)
    .png()
    .toBuffer();

  // Step 3: Composite the original with the mask applied to alpha
  // Use the mask as alpha channel
  const maskedBuf = await sharp(origBuf)
    .composite([{
      input: maskBuf,
      blend: 'dest-in'   // alpha of result = alpha of maskBuf
    }])
    .png()
    .toBuffer();

  // Step 4: Trim to bounding box of non-transparent pixels
  const { data: trimData, info: trimInfo } = await sharp(maskedBuf)
    .trim({ threshold: 5 })
    .png()
    .toBuffer({ resolveWithObject: true });

  console.log(`After mask+trim: ${trimInfo.width}x${trimInfo.height}`);

  // Step 5: Make square with transparent padding
  const dim = Math.max(trimInfo.width, trimInfo.height);
  const padTop  = Math.floor((dim - trimInfo.height) / 2);
  const padBot  = dim - trimInfo.height - padTop;
  const padLeft = Math.floor((dim - trimInfo.width) / 2);
  const padRight = dim - trimInfo.width - padLeft;

  const squaredBuf = await sharp(trimData)
    .extend({ top: padTop, bottom: padBot, left: padLeft, right: padRight,
              background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Save 1024px master
  const masterPath = path.join(OUT, 'logo-medallion-1024.png');
  // Resize back to exactly 1024 (the trimmed square may differ)
  await sharp(squaredBuf)
    .resize(1024, 1024, { fit: 'fill' })
    .png()
    .toFile(masterPath);
  console.log(`✓ logo-medallion-1024.png (${Math.round(fs.statSync(masterPath).size / 1024)} KB)`);

  // WebP variants from the 1024 master
  const sizes = [
    { name: 'logo-medallion-288.webp', px: 288, quality: 92 },
    { name: 'logo-medallion-576.webp', px: 576, quality: 90 },
  ];

  for (const { name, px, quality } of sizes) {
    const dest = path.join(OUT, name);
    await sharp(masterPath)
      .resize(px, px, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality, alphaQuality: 100 })
      .toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`✓ ${name} (${kb} KB)`);
  }

  console.log('\n✅ Medallion assets complete');
}

run().catch(err => { console.error(err.message); process.exit(1); });
