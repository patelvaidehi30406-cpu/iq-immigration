const { Jimp } = require('jimp');
const path = require('path');

async function inspect(filename) {
  try {
    const inPath = path.join(__dirname, 'public', filename);
    const image = await Jimp.read(inPath);
    console.log(`\nInspecting ${filename}:`);
    console.log(`Dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
    
    // Print colors of first few pixels along top edge
    console.log('Top edge pixels (x from 0 to 10, y=0):');
    const width = image.bitmap.width;
    const data = image.bitmap.data;
    for (let x = 0; x < 10; x++) {
      const idx = (0 * width + x) * 4;
      const r = data[idx + 0];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      console.log(`  Pixel x=${x}, y=0: R=${r}, G=${g}, B=${b}, A=${a}`);
    }
  } catch (err) {
    console.error(err);
  }
}

inspect('iq-logo-full.png');
inspect('iq-icon.png');
