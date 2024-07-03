const fs = require('fs');

/**
 * clean kybook notes TEXT output format
 *
 * given a text file
 * trim beginning and end of line
 * delete any lines that are "***"
 * remove the "> " if a line starts with it
 * leaves maximum of one blank line between text
 * @param {string} inPath
 * @param {string} outPath
 */
function processFile(inPath, outPath) {
  try {
    const data = fs.readFileSync(inPath, 'utf8');
    const lines = data.split('\n');
    let lastLine = '';
    const processedLines = lines
      .map((line) => {
        line = line.trim();
        if (line === '***') {
          return null;
        }
        if (line === '' && lastLine === '') {
          return null;
        }
        if (line.startsWith('> ')) {
          line = line.replace('> ', '');
        }

        // remove curly quotes
        line = line.replace(/[\u201C\u201D]/g, '"');
        line = line.replace(/[\u2018\u2019]/g, "'");

        lastLine = line;
        return line;
      })
      .filter((line) => line !== null);

    const processedData = processedLines.join('\n');

    fs.writeFileSync(outPath, processedData);
    console.log('Success!');
  } catch (e) {
    console.error('Error:', e.message);
    console.error(e.stack);
  }
}

function main() {
  const [, , inputPath, outputPath] = process.argv;
  console.log('inputPath:', inputPath);
  console.log('outputPath:', outputPath);

  if (!inputPath || !outputPath) {
    throw new Error('argument(s) for input and output must be defined');
  }
  processFile(inputPath, outputPath);
}

main();
