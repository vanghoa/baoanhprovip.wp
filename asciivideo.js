const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const zlib = require('zlib'); // Import zlib for gzip compression

// Directory where your .webm video files are located
const videosDir = './src/images';
// Directory to temporarily store extracted frames
const framesDir = './frames';
const hratio = 2.1;

// Custom gray ramp (ASCII characters mapped to brightness levels)
const grayRamp = '█▒░@%*=--..__';

// Desired width for the output frames
const desiredWidth = 100;

// Ensure frames directory exists
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir);
}

// Extract frames for each video using ffmpeg
function extractFrames(videoPath, outputDir, callback) {
  ffmpeg(videoPath)
    .on('end', function () {
      console.log(`Frames extracted for video: ${path.basename(videoPath)}`);
      callback();
    })
    .on('error', function (err) {
      console.error(`Error extracting frames from ${videoPath}:`, err);
    })
    .saveToFile(path.join(outputDir, 'frame_%04d.png'));
}

// Get video resolution (width and height) using ffmpeg
function getVideoInfo(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        return reject(err);
      }
      const videoStream = metadata.streams.find(
        (stream) => stream.codec_type === 'video'
      );
      const originalWidth = videoStream.width;
      const originalHeight = videoStream.height;
      const frameRate = eval(videoStream.r_frame_rate); // Convert frame rate to number
      const mspF = 1000 / frameRate; // Calculate ms per frame
      resolve({ originalWidth, originalHeight, mspF });
    });
  });
}

// Convert brightness to ASCII based on gray ramp
function brightnessToAscii(brightness) {
  const index = Math.floor((brightness / 255) * (grayRamp.length - 1));
  return grayRamp[index];
}

function getCharacterForGrayScale(grayScale) {
  return grayRamp[Math.ceil(((grayRamp.length - 1) * grayScale) / 255)];
}

// Convert each frame to a single string of ASCII characters
async function frameToAsciiString(framePath, width, height) {
  const image = await loadImage(framePath);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const contrast = 1.2; //convert to decimal & shift range: [0..2]
  const intercept = 128 * (1 - contrast);
  let asciiString = '';

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i] * contrast + intercept;
    const g = imageData[i + 1] * contrast + intercept;
    const b = imageData[i + 2] * contrast + intercept;
    asciiString += getCharacterForGrayScale(toGrayScale(r, g, b));
  }
  return asciiString;
}

function toGrayScale(r, g, b) {
  const v = 0.21 * r + 0.72 * g + 0.07 * b;
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

// Convert all frames to a single string of ASCII characters
async function convertFramesToAscii(framesDir, width, height) {
  const frameFiles = fs
    .readdirSync(framesDir)
    .filter((file) => file.endsWith('.png'));
  let allFramesAscii = '';
  let frameCount = 0;

  for (const frameFile of frameFiles) {
    const framePath = path.join(framesDir, frameFile);
    const asciiString = await frameToAsciiString(framePath, width, height);
    allFramesAscii += asciiString;
    frameCount++;
    console.log(`Converted frame ${frameFile} to ASCII`);
  }

  return {
    str: allFramesAscii,
    w: width,
    h: height,
    c: frameCount,
  };
}

// Process multiple videos in the directory
async function processVideosInFolder() {
  const videoFiles = fs
    .readdirSync(videosDir)
    .filter((file) => file.endsWith('.webm'));
  const videoDataObject = {};

  for (const videoFile of videoFiles) {
    const videoName = path.basename(videoFile, '.webm'); // Get video name without extension
    const videoPath = path.join(videosDir, videoFile);

    console.log(`Processing video: ${videoFile}`);

    // Get the original resolution of the video
    const { originalWidth, originalHeight, mspF } = await getVideoInfo(
      videoPath
    );
    console.log(`Video resolution: ${originalWidth}x${originalHeight}`);

    // Calculate new height to maintain aspect ratio
    const newHeight = Math.round(
      (originalHeight * (desiredWidth / originalWidth)) / hratio
    );
    console.log(`Resizing to: ${desiredWidth}x${newHeight}`);

    // Extract frames from the video
    await new Promise((resolve) => {
      extractFrames(videoPath, framesDir, resolve);
    });

    // Convert frames to ASCII and store in videoDataObject
    const asciiVideoObject = await convertFramesToAscii(
      framesDir,
      desiredWidth,
      newHeight
    );
    asciiVideoObject.mspF = mspF; // Include milliseconds per frame
    videoDataObject[videoName] = asciiVideoObject;

    // Clean up framesDir for the next video
    fs.readdirSync(framesDir).forEach((file) =>
      fs.unlinkSync(path.join(framesDir, file))
    );
  }

  // Ensure the destination directory exists
  const outputDir = path.join(__dirname, 'assets/unprocessedjs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Gzip the JSON data without saving it to a file
  const jsonString = JSON.stringify(videoDataObject, null, 2);
  const gzippedBuffer = zlib.gzipSync(jsonString); // Gzip the JSON string synchronously

  // Save the gzipped data to a .gz file
  const gzipFilePath = path.join(outputDir, 'asciiVideos.json.gz');
  fs.writeFileSync(gzipFilePath, gzippedBuffer); // Write the gzipped buffer to a file
  console.log(`Gzipped JSON file saved to ${gzipFilePath}`);
}

// Run the conversion for all videos
processVideosInFolder();
