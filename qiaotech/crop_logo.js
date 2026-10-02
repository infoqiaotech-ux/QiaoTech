const sharp = require('sharp');

async function processImage() {
  const imgPath = 'd:/QiaoTech_website/qiaotech/public/my_logo.png';
  const outPath = 'd:/QiaoTech_website/qiaotech/public/my_logo_cropped.png';

  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
  
  // To identify checkerboard, it's usually light gray and white.
  // Gold ring is dark or golden. We can check if a pixel is significantly different from gray/white.
  // Let's say if r < 200 or b < 200 (since white/light gray is >200 in all channels)
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      const isCheckerboard = (r > 190 && g > 190 && b > 190) && (Math.abs(r - g) < 20) && (Math.abs(g - b) < 20);
      
      if (!isCheckerboard) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Bounding box found: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}`);

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;

  // Make it a perfect square based on the maximum dimension
  const size = Math.max(cropWidth, cropHeight);
  const cx = minX + cropWidth / 2;
  const cy = minY + cropHeight / 2;

  const left = Math.max(0, Math.floor(cx - size / 2));
  const top = Math.max(0, Math.floor(cy - size / 2));
  const right = Math.min(info.width, left + size);
  const bottom = Math.min(info.height, top + size);
  
  const finalSize = Math.min(right - left, bottom - top);

  console.log(`Cropping to square: left=${left}, top=${top}, size=${finalSize}`);

  // Create a circular SVG mask
  const circleSvg = Buffer.from(
    `<svg width="${finalSize}" height="${finalSize}">
      <circle cx="${finalSize/2}" cy="${finalSize/2}" r="${finalSize/2}" fill="white" />
    </svg>`
  );

  await sharp(imgPath)
    .extract({ left, top, width: finalSize, height: finalSize })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toFile(outPath);

  console.log('Successfully cropped and masked the logo to my_logo_cropped.png');
}

processImage().catch(console.error);
