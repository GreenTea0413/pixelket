const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertSvgToPng() {
  const conversions = [
    {
      input: 'app/icon.svg',
      output: 'app/icon.png',
      width: 512,
      height: 512
    },
    {
      input: 'app/apple-icon.svg',
      output: 'app/apple-icon.png',
      width: 180,
      height: 180
    },
    {
      input: 'app/opengraph-image.svg',
      output: 'app/opengraph-image.png',
      width: 1200,
      height: 630
    }
  ];

  for (const { input, output, width, height } of conversions) {
    try {
      const inputPath = path.join(process.cwd(), input);
      const outputPath = path.join(process.cwd(), output);

      if (!fs.existsSync(inputPath)) {
        console.log(`❌ File not found: ${input}`);
        continue;
      }

      await sharp(inputPath)
        .resize(width, height)
        .png()
        .toFile(outputPath);

      console.log(`✅ Converted: ${input} → ${output}`);
    } catch (error) {
      console.error(`❌ Error converting ${input}:`, error.message);
    }
  }

  console.log('\n🎉 All conversions completed!');
}

convertSvgToPng().catch(console.error);
