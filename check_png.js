const fs = require('fs');
const path = require('path');

function checkPNG(filepath) {
  const buf = fs.readFileSync(filepath);
  // PNG signature
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4E || buf[3] !== 0x47) {
    console.log(`${filepath} is not a valid PNG`);
    return;
  }
  
  // IHDR chunk starts at byte 12 (length at 8, type at 12)
  const ihdrType = buf.toString('ascii', 12, 16);
  if (ihdrType !== 'IHDR') {
    console.log(`${filepath} first chunk is not IHDR`);
    return;
  }
  
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  
  console.log(`${filepath}:`);
  console.log(`  Dimensions: ${width}x${height}`);
  console.log(`  Bit Depth: ${bitDepth}`);
  console.log(`  Color Type: ${colorType} (0=grayscale, 2=RGB, 3=palette, 4=grayscale+alpha, 6=RGBA)`);
}

checkPNG(path.join(__dirname, 'public', 'iq-logo-full.png'));
checkPNG(path.join(__dirname, 'public', 'iq-icon.png'));
checkPNG(path.join(__dirname, 'public', 'iq-logo.png'));
