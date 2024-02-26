const fs = require('fs');
const path = require('path');

const UNALLOWED_FILENAMES = ['.DS_Store'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInts(min, max, numberOfInts) {
  const ints = [];
  for (let i = 0; i < numberOfInts; i++) {
    ints.push(getRandomInt(min, max));
  }

  return ints;
}

// Function to get a list of all files in a directory recursively
function listFiles(dir, opts) {
  const files = fs.readdirSync(dir);
  const { root: rootDir } = opts;
  const lines = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      return lines.push(...listFiles(fullPath, opts))
    }

    const fileName = path.basename(fullPath);
    if (UNALLOWED_FILENAMES.includes(fileName)) {
      return;
    }

    lines.push(fullPath.replace(rootDir, ''));
  });

  return lines;
}

/**
 * Usage with random:
 * node list-files-in-dir.js path/to/Notes/ random=20 > notes-list-random.txt
 *
 * Usage non-random:
 * node list-files-in-dir.js path/to/Notes/ > notes-list-full.txt
 */
function main() {
  if (process.argv.length > 2) {
    // command-line argument 1 (required): directory path
    // command-line argument 2 (optional): random=N
    const [, , dirPath, randomInts] = process.argv;

    const lines = listFiles(dirPath, { root: dirPath });

    if (randomInts) {
      const [, num] = randomInts.split('=').map(Number);
      console.log(`${num} random files in dir: ${dirPath}\n`);
      const randomNumbers = getRandomInts(0, lines.length, num);

      randomNumbers.forEach((randomInt) => {
        console.log(lines[randomInt]);
      });
      return;
    }

    console.log(`All files in dir: ${dirPath}\n`);
    lines.forEach((line) => {
      console.log(line);
    });
  } else {
    console.error(
      'Please provide a directory path as a command-line argument.'
    );
  }
}

main();
