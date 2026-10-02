const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const origPath = 'd:/QiaoTech_website/my_logo.png'; // use the original uncropped one as source!
  const outPath = 'd:/QiaoTech_website/qiaotech/public/my_logo.png';

  const { data, info } = await sharp(origPath).raw().toBuffer({ resolveWithObject: true });
  
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
  
  // Find bounding box by skipping all bright pixels (the checkerboard is white/light grey >200)
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // The checkerboard is light. Gold/Dark blue is dark.
      // If any channel is < 150, it's definitely NOT the checkerboard.
      if (r < 180 || g < 180 || b < 180) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`True Bounding Box: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);

  // Create a perfectly square crop box based on the center of this bounding box
  const boxWidth = maxX - minX;
  const boxHeight = maxY - minY;
  
  // Since it's a circle, width and height should be roughly equal
  const diameter = Math.max(boxWidth, boxHeight);
  
  const cx = minX + boxWidth / 2;
  const cy = minY + boxHeight / 2;
  
  const left = Math.floor(cx - diameter / 2);
  const top = Math.floor(cy - diameter / 2);
  
  console.log(`Cropping square: left=${left}, top=${top}, size=${diameter}`);

  // Make the mask 2 pixels smaller than the bounding box to ensure NO checkerboard sneaks in!
  const finalSize = diameter;
  
  const circleSvg = Buffer.from(
    `<svg width="${finalSize}" height="${finalSize}">
      <circle cx="${finalSize/2}" cy="${finalSize/2}" r="${(finalSize/2) - 4}" fill="white" />
    </svg>`
  );

  const buffer = await sharp(origPath)
    .extract({ left: Math.max(0, left), top: Math.max(0, top), width: finalSize, height: finalSize })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();
    
  await sharp(buffer).toFile(outPath);

  console.log('Successfully cropped and masked the logo to public/my_logo.png from original file!');
}

processImage().catch(console.error);
