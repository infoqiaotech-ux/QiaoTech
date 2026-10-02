/**
 * QIAO TECH Logo Asset Pipeline
 * Uses sharp to generate all required logo sizes from the extracted PNG
 * Run: node generate_logo_assets.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'd:/QiaoTech_website/assets/logo/original.png';
const OUT = 'd:/QiaoTech_website/assets/logo';
const ICONS = 'd:/QiaoTech_website/assets/icons';

// Ensure dirs exist
[OUT, ICONS].forEach(d => fs.mkdirSync(d, { recursive: true }));

async function run() {
  // Get source metadata
  const meta = await sharp(SRC).metadata();
  console.log(`Source: ${meta.width}x${meta.height} ${meta.format}`);

  const src = sharp(SRC);

  // 1. Logo-44 (header, footer) — WebP
  await sharp(SRC).resize(44, 44, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 }).toFile(path.join(OUT, 'logo-44.webp'));
  console.log('✓ logo-44.webp');

  // 2. Logo-88 (header @2x)
  await sharp(SRC).resize(88, 88, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 }).toFile(path.join(OUT, 'logo-88.webp'));
  console.log('✓ logo-88.webp');

  // 3. Logo-72 (mobile menu)
  await sharp(SRC).resize(72, 72, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 }).toFile(path.join(OUT, 'logo-72.webp'));
  console.log('✓ logo-72.webp');

  // 4. Logo-144 (mobile menu @2x)
  await sharp(SRC).resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 }).toFile(path.join(OUT, 'logo-144.webp'));
  console.log('✓ logo-144.webp');

  // 5. Logo-288 (hero orb)
  await sharp(SRC).resize(288, 288, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92 }).toFile(path.join(OUT, 'logo-288.webp'));
  console.log('✓ logo-288.webp');

  // 6. Logo-576 (hero orb @2x)
  await sharp(SRC).resize(576, 576, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92 }).toFile(path.join(OUT, 'logo-576.webp'));
  console.log('✓ logo-576.webp');

  // 7. Favicon 32px PNG
  await sharp(SRC).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(path.join(ICONS, 'favicon-32.png'));
  console.log('✓ favicon-32.png');

  // 8. Apple touch icon 180px PNG
  await sharp(SRC).resize(180, 180, { fit: 'contain', background: { r: 11, g: 18, b: 41, alpha: 1 } })
    .png().toFile(path.join(ICONS, 'apple-touch-icon-180.png'));
  console.log('✓ apple-touch-icon-180.png');

  // 9. PWA icon 192px
  await sharp(SRC).resize(192, 192, { fit: 'contain', background: { r: 11, g: 18, b: 41, alpha: 1 } })
    .png().toFile(path.join(ICONS, 'icon-192.png'));
  console.log('✓ icon-192.png');

  // 10. PWA icon 512px
  await sharp(SRC).resize(512, 512, { fit: 'contain', background: { r: 11, g: 18, b: 41, alpha: 1 } })
    .png().toFile(path.join(ICONS, 'icon-512.png'));
  console.log('✓ icon-512.png');

  // 11. Maskable 512px (emblem centered in 80% safe zone → leave 10% padding each side)
  // 10% of 512 = 51px padding each side → emblem in 410x410 center
  await sharp(SRC)
    .resize(410, 410, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 51, bottom: 51, left: 51, right: 51,
      background: { r: 11, g: 18, b: 41, alpha: 1 }
    })
    .png().toFile(path.join(ICONS, 'icon-maskable-512.png'));
  console.log('✓ icon-maskable-512.png');

  // 12. OG image 1200x630 — Navy bg + centered emblem
  const emblemForOG = await sharp(SRC)
    .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Create 1200x630 navy base
  const base = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#222941"/>
          <stop offset="100%" stop-color="#060d24"/>
        </radialGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
      </defs>
      <rect width="1200" height="630" fill="#0b1229"/>
      <!-- Gold glow orb -->
      <circle cx="420" cy="315" r="280" fill="#eac078" opacity="0.06" filter="url(#blur)"/>
      <!-- Cyan glow orb -->
      <circle cx="750" cy="200" r="200" fill="#5bdfff" opacity="0.04" filter="url(#blur)"/>
      <!-- Border line top -->
      <line x1="0" y1="0" x2="1200" y2="0" stroke="#eac078" stroke-width="2" opacity="0.4"/>
      <!-- Wordmark area: QIAO TECH -->
      <text x="640" y="295" font-family="Sora, sans-serif" font-size="64" font-weight="700" fill="#dce1ff" text-anchor="middle" letter-spacing="-1">QIAO <tspan fill="#eac078">TECH</tspan></text>
      <text x="640" y="345" font-family="Space Grotesk, sans-serif" font-size="18" font-weight="600" fill="#9a8f80" text-anchor="middle" letter-spacing="3">CLEVER AI. SMART AUTOMATION.</text>
      <!-- Divider -->
      <line x1="520" y1="375" x2="760" y2="375" stroke="#4e4639" stroke-width="1"/>
      <text x="640" y="405" font-family="Manrope, sans-serif" font-size="15" fill="#d1c5b4" text-anchor="middle">Pune, Maharashtra, India</text>
    </svg>`
  );

  await sharp(base)
    .composite([{
      input: emblemForOG,
      left: 200,
      top: 215,
    }])
    .png()
    .toFile(path.join(OUT, 'og-image-1200x630.png'));
  console.log('✓ og-image-1200x630.png');

  // 13. Copy original as logo-master.png
  await sharp(SRC).resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(path.join(OUT, 'logo-master.png'));
  console.log('✓ logo-master.png');

  console.log('\n✅ All logo assets generated successfully!');
  
  // List file sizes
  const files = fs.readdirSync(OUT).concat(fs.readdirSync(ICONS).map(f => '../icons/' + f));
  console.log('\nFile sizes:');
  for (const file of files) {
    const dir = file.startsWith('../icons/') ? ICONS : OUT;
    const name = file.replace('../icons/', '');
    try {
      const stat = fs.statSync(path.join(dir, name));
      console.log(`  ${file}: ${(stat.size / 1024).toFixed(1)} KB`);
    } catch(e) {}
  }
}

run().catch(console.error);
