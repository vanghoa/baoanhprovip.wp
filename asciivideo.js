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

// Extract frames dynamically based on the desired interval
function extractFrames(videoPath, outputDir, msPerFrame, callback) {
  const fps = 1000 / msPerFrame; // Calculate frames per second based on the desired ms per frame

  ffmpeg(videoPath)
    .outputOptions('-vf', `fps=${fps}`) // Dynamically set fps based on ms per frame
    .on('end', function () {
      console.log(`Frames extracted for video: ${path.basename(videoPath)}`);
      callback();
    })
    .on('error', function (err) {
      console.error(`Error extracting frames from ${videoPath}:`, err);
    })
    .save(path.join(outputDir, 'frame_%04d.png'));
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
      resolve({ originalWidth, originalHeight });
    });
  });
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
async function convertFramesToAscii(framesDir, width, height, msPerFrame) {
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
    mspF: msPerFrame, // Dynamically set ms per frame
  };
}

// Process multiple videos in the directory
async function processVideosInFolder(msPerFrame = 100) {
  const videoFiles = fs
    .readdirSync(videosDir)
    .filter((file) => file.endsWith('.webm'));
  const nameList = [];

  // Ensure the destination directory exists
  const outputDir = path.join(__dirname, 'assets/unprocessedjs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const videoFile of videoFiles) {
    const videoName = path.basename(videoFile, '.webm'); // Get video name without extension
    const videoPath = path.join(videosDir, videoFile);

    console.log(`Processing video: ${videoFile}`);

    // Get the original resolution of the video
    const { originalWidth, originalHeight } = await getVideoInfo(videoPath);
    console.log(`Video resolution: ${originalWidth}x${originalHeight}`);

    // Calculate new height to maintain aspect ratio
    const newHeight = Math.round(
      (originalHeight * (desiredWidth / originalWidth)) / hratio
    );
    console.log(`Resizing to: ${desiredWidth}x${newHeight}`);

    // Extract frames from the video with the desired interval
    await new Promise((resolve) => {
      extractFrames(videoPath, framesDir, msPerFrame, resolve);
    });

    // Convert frames to ASCII and store in videoDataObject
    const asciiVideoObject = await convertFramesToAscii(
      framesDir,
      desiredWidth,
      newHeight,
      msPerFrame
    );
    asciiVideoObject.name = videoName;

    // Clean up framesDir for the next video
    fs.readdirSync(framesDir).forEach((file) =>
      fs.unlinkSync(path.join(framesDir, file))
    );

    // Gzip the JSON data without saving it to a file
    const jsonString = JSON.stringify(asciiVideoObject, null, 2);
    const gzippedBuffer = zlib.gzipSync(jsonString); // Gzip the JSON string synchronously

    // Save the gzipped data to a .gz file
    const gzipFilePath = path.join(outputDir, `${videoName}.gz`);
    fs.writeFileSync(gzipFilePath, gzippedBuffer); // Write the gzipped buffer to a file
    console.log(`Gzipped JSON file saved to ${gzipFilePath}`);

    // save namelist
    nameList.push(videoName);
  }

  const str = JSON.stringify(nameList, null, 2);
  const pathfile = path.join(outputDir, `nameList.json`);
  fs.writeFileSync(pathfile, str);
}

// Run the conversion for all videos with a dynamic interval (default is 100ms)
processVideosInFolder(100); // You can change the value to any other ms value, like 50, 200, etc.
