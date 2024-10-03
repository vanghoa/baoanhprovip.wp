const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');

// Path to your video file
const videoFilePath = './input-video.webm';
// Directory to store extracted frames
const framesDir = './frames';

// Ensure frames directory exists
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir);
}

// Extract frames using ffmpeg
function extractFrames(videoPath, outputDir, callback) {
  ffmpeg(videoPath)
    .on('end', function () {
      console.log('Frames extracted successfully');
      callback();
    })
    .on('error', function (err) {
      console.error('Error extracting frames:', err);
    })
    .saveToFile(path.join(outputDir, 'frame_%04d.png'));
}

// Convert each frame to brightness level array
async function frameToBrightnessArray(framePath) {
  const image = await loadImage(framePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height).data;

  const brightnessArray = [];
  for (let y = 0; y < image.height; y++) {
    const row = [];
    for (let x = 0; x < image.width; x++) {
      const offset = (y * image.width + x) * 4;
      const r = imageData[offset];
      const g = imageData[offset + 1];
      const b = imageData[offset + 2];
      const brightness = Math.round((r + g + b) / 3); // Grayscale conversion
      row.push(brightness);
    }
    brightnessArray.push(row);
  }
  return brightnessArray;
}

// Convert all frames to brightness arrays
async function convertFramesToBrightness(framesDir) {
  const frameFiles = fs
    .readdirSync(framesDir)
    .filter((file) => file.endsWith('.png'));
  const brightnessFrames = [];

  for (const frameFile of frameFiles) {
    const framePath = path.join(framesDir, frameFile);
    const brightnessArray = await frameToBrightnessArray(framePath);
    brightnessFrames.push(brightnessArray);
    console.log(`Converted frame ${frameFile} to brightness array`);
  }

  return brightnessFrames;
}

// Main function to extract frames and convert to brightness arrays
function processVideoToBrightness() {
  extractFrames(videoFilePath, framesDir, async () => {
    const brightnessFrames = await convertFramesToBrightness(framesDir);

    // Output the brightness frames as an array
    console.log(brightnessFrames);

    // Optionally, save to a file
    fs.writeFileSync(
      'brightnessFrames.json',
      JSON.stringify(brightnessFrames, null, 2)
    );
  });
}

// Run the conversion
processVideoToBrightness();
