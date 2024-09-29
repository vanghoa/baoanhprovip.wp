const fs = require('fs');
const path = require('path');

// Directories
const currentDir = path.join(__dirname);
const destDir = path.join(__dirname, '../notebook');
const notebookPageDir = path.join(__dirname, 'notebookpage');

// Exclusions for the first copy (updated with additional directories)
const excludeDirs = [
  'node_modules',
  'vendor',
  'notebookpage',
  'src',
  '.vscode',
];

const alwaysIncludeFiles = [
  'footer.php',
  'header.php',
  'functions.php',
  'home.php',
  'index.php',
  'style.css',
];

// Function to recursively clear a directory, keeping the .git folder
function clearDirectory(dir) {
  if (fs.existsSync(dir)) {
    const filesAndDirs = fs.readdirSync(dir);
    filesAndDirs.forEach((item) => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      // Skip the .git directory
      if (item === '.git') {
        return;
      }
      if (stat.isDirectory()) {
        // Recursively clear the directory
        clearDirectory(itemPath);
        fs.rmdirSync(itemPath); // Remove the empty directory
      } else {
        // Remove the file
        fs.unlinkSync(itemPath);
        console.log(`Deleted: ${itemPath}`);
      }
    });
  }
}

// Function to recursively copy files, with replacement
function copyFilesRecursive(
  src,
  dest,
  excludeDirs,
  alwaysIncludeFiles,
  level = 0
) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const filesAndDirs = fs.readdirSync(src);

  filesAndDirs.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);

    // Skip excluded folders
    if (excludeDirs.includes(item)) {
      return;
    }

    // Exclude files at the first level except for specified files
    if (
      alwaysIncludeFiles &&
      level === 0 &&
      stat.isFile() &&
      !alwaysIncludeFiles.includes(item)
    ) {
      return;
    }

    // If it's a directory, recursively copy its content
    if (stat.isDirectory()) {
      copyFilesRecursive(
        srcPath,
        destPath,
        excludeDirs,
        alwaysIncludeFiles,
        level + 1
      );
    } else {
      // Otherwise, copy and replace the file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied and replaced: ${srcPath} -> ${destPath}`);
    }
  });
}

// Sequential execution to ensure that files from notebookpage replace those from the first copy
function runCopyTasksSequentially() {
  // Clear the ../notebook directory, keeping the .git folder
  clearDirectory(destDir);

  console.log(
    'First task: Copy from currentDir excluding certain folders and files...'
  );

  // Task 1: Copy everything from the current folder to ../notebook/, excluding the specified folders and files
  copyFilesRecursive(currentDir, destDir, excludeDirs, alwaysIncludeFiles);

  console.log(
    'Second task: Copy from notebookpage and replace existing files...'
  );

  // Task 2: Copy all files from /notebookpage folder to ../notebook/, replacing existing files
  copyFilesRecursive(notebookPageDir, destDir, [], null);
  console.log('Copying and replacing process completed.');
}

// Run the tasks sequentially
runCopyTasksSequentially();
