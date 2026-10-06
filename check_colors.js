const { Jimp } = require('jimp');
const path = require('path');

async function checkColors() {
  try {
    const inPath = path.join(__dirname, 'public', 'iq-logo-full.png');
    const image = await Jimp.read(inPath);
    const data = image.bitmap.data;
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    let transparent = 0;
    let white = 0;
    let other = 0;
    let sampleWhite = [];
    let sampleOther = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx + 0];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        
        if (a === 0) {
          transparent++;
        } else if (r > 220 && g > 220 && b > 220) {
          white++;
          if (sampleWhite.length < 5) {
            sampleWhite.push({ x, y, r, g, b, a });
          }
        } else {
          other++;
          if (sampleOther.length < 5) {
            sampleOther.push({ x, y, r, g, b, a });
          }
        }
      }
    }
    
    console.log(`Total pixels: ${width * height}`);
    console.log(`Transparent: ${transparent}`);
    console.log(`White/Light pixels (R,G,B > 220): ${white}`);
    console.log(`Other pixels: ${other}`);
    console.log('Sample White pixels:', sampleWhite);
    console.log('Sample Other pixels:', sampleOther);
  } catch (err) {
    console.error(err);
  }
}

checkColors();

