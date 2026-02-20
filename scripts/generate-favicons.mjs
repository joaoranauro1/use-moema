import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const svgPath = resolve(root, 'src/app/icon.svg');
const svg = readFileSync(svgPath);

// Generate apple-icon.png (180x180)
await sharp(svg, { density: 300 })
  .resize(180, 180)
  .png()
  .toFile(resolve(root, 'src/app/apple-icon.png'));

console.log('apple-icon.png (180x180) created');

// Generate 32x32 PNG for favicon.ico
const png32 = await sharp(svg, { density: 300 })
  .resize(32, 32)
  .png()
  .toBuffer();

// Generate 16x16 PNG
const png16 = await sharp(svg, { density: 300 })
  .resize(16, 16)
  .png()
  .toBuffer();

// Build ICO file manually (contains 16x16 and 32x32 PNGs)
function buildIco(images) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dataOffset = headerSize + dirEntrySize * count;

  // ICO header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);     // reserved
  header.writeUInt16LE(1, 2);     // type: 1 = ICO
  header.writeUInt16LE(count, 4); // count

  let offset = dataOffset;
  const dirEntries = [];
  for (const { width, height, data } of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);       // color palette
    entry.writeUInt8(0, 3);       // reserved
    entry.writeUInt16LE(1, 4);    // color planes
    entry.writeUInt16LE(32, 6);   // bits per pixel
    entry.writeUInt32LE(data.length, 8);  // data size
    entry.writeUInt32LE(offset, 12);      // data offset
    dirEntries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(i => i.data)]);
}

const ico = buildIco([
  { width: 16, height: 16, data: png16 },
  { width: 32, height: 32, data: png32 },
]);

writeFileSync(resolve(root, 'src/app/favicon.ico'), ico);
console.log('favicon.ico (16x16 + 32x32) created');
