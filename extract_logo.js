const fs = require('fs');
const path = require('path');

const svg = fs.readFileSync('d:/QiaoTech_website/my_logo.svg', 'utf8');
const m = svg.match(/image href="data:image\/png;base64,([^"]+)"/);
if (m) {
  const pngData = Buffer.from(m[1], 'base64');
  fs.mkdirSync('d:/QiaoTech_website/assets/logo', { recursive: true });
  fs.writeFileSync('d:/QiaoTech_website/assets/logo/original.png', pngData);
  console.log('Extracted PNG, size:', pngData.length, 'bytes');
} else {
  // Try to get the SVG dimensions and copy as-is
  const wm = svg.match(/width="(\d+)"/);
  const hm = svg.match(/height="(\d+)"/);
  console.log('No embedded PNG. SVG dims:', wm ? wm[1] : '?', 'x', hm ? hm[1] : '?');
  // Copy the SVG itself as the logo
  fs.mkdirSync('d:/QiaoTech_website/assets/logo', { recursive: true });
  fs.copyFileSync('d:/QiaoTech_website/my_logo.svg', 'd:/QiaoTech_website/assets/logo/original.svg');
  console.log('SVG copied as original.svg');
}
