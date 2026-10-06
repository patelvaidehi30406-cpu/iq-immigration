const { Jimp } = require('jimp');
const path = require('path');

async function removeBg(filename, outname) {
  try {
    const inPath = path.join(__dirname, 'public', filename);
    const outPath = path.join(__dirname, 'public', outname);
    
    console.log(`Reading ${inPath}...`);
    const image = await Jimp.read(inPath);
    
    let count = 0;
    // Scan all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];
      
      // Check if it's very close to white (allow some tolerance)
      if (r > 240 && g > 240 && b > 240 && a > 0) {
        // Set alpha to 0
        this.bitmap.data[idx + 3] = 0;
        count++;
      }
    });
    
    console.log(`Writing ${outPath} (modified ${count} pixels)...`);
    await image.write(outPath);
    console.log(`Success!`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

async function run() {
  await removeBg('iq-logo-full.png', 'iq-logo-full-transparent.png');
  await removeBg('iq-icon.png', 'iq-icon-transparent.png');
  await removeBg('iq-logo.png', 'iq-logo-transparent.png');
}

run();
