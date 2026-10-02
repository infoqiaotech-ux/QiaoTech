const sharp = require('sharp');

async function processImage() {
  const imgPath = 'd:/QiaoTech_website/qiaotech/public/my_logo.png';
  const outPath = 'd:/QiaoTech_website/qiaotech/public/my_logo.png'; // Overwrite it!

  // We determined the margin is exactly 5% on all sides
  const info = await sharp(imgPath).metadata();
  
  const margin = Math.floor(info.width * 0.05);
  const size = info.width - margin * 2;

  console.log(`Cropping margin of ${margin}px. New size: ${size}x${size}`);

  // Create a circular SVG mask
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white" />
    </svg>`
  );

  const buffer = await sharp(imgPath)
    .extract({ left: margin, top: margin, width: size, height: size })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();
    
  await sharp(buffer).toFile(outPath);

  console.log('Successfully cropped and masked the logo to my_logo.png');
}

processImage().catch(console.error);
