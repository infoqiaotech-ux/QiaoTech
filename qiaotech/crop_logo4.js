const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const origPath = 'd:/QiaoTech_website/my_logo.png';
  const outPath = 'd:/QiaoTech_website/qiaotech/public/my_logo.png';

  const info = await sharp(origPath).metadata();
  
  // The subagent verified the logo occupies roughly columns 1-18 and rows 1-18 on a 20x20 grid.
  // This means the margin is exactly 1/20 (5%)? No, 1 to 18 is 17 units out of 20. 
  // Wait, if it spans 1 to 18, there is 1 unit margin on left (0), and 1 unit margin on right (19).
  // So margin is 1/20 = 5%.
  // But wait, earlier I cropped 5% and the subagent said the checkerboard is still visible!
  // Let's crop 8.5% (approx 350 pixels) to be absolutely safe and remove the fringe.
  
  const margin = 350;
  const size = info.width - margin * 2;
  
  console.log(`Cropping square: left=${margin}, top=${margin}, size=${size}`);

  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="white" />
    </svg>`
  );

  const buffer = await sharp(origPath)
    .extract({ left: margin, top: margin, width: size, height: size })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();
    
  await sharp(buffer).toFile(outPath);

  console.log('Successfully cropped and masked the logo!');
}

processImage().catch(console.error);
