const fs = require('fs');
const path = require('path'); // Import the path module

// Function to process the file
function processFile(inputFilePath, outputFilePath) {
  // Ensure output file has a .txt extension
  if (!path.extname(outputFilePath).toLowerCase().startsWith('.txt')) {
    throw new Error('Output file must be a .txt file.');
  }

  // Read the input file content
  fs.readFile(inputFilePath, { encoding: 'utf8' }, (err, inputData) => {
    if (err) {
      console.error(`Error reading input file ${inputFilePath}:`, err);
      return;
    }

    // Split the input file content into lines
    const lines = inputData.split('\n');

    // Process each line
    let processedLines = [];
    lines.forEach((line) => {
      // Skip empty lines and lines containing '-->'
      if (!line.trim() || line.includes('-->')) {
        return; // Skip this line
      }
      processedLines.push(line);
    });

    // Write the processed lines to the output file
    fs.writeFile(outputFilePath, processedLines.join('\n'), (err) => {
      if (err) {
        console.error(`Error writing to output file ${outputFilePath}:`, err);
      } else {
        console.log(`Processed text saved to ${outputFilePath}`);
      }
    });
  });
}

// Parse command-line arguments
const args = process.argv.slice(2); // Remove the first two elements ('node', 'scriptName')
if (args.length !== 2) {
  console.error('Usage: node processFile.js <inputFilePath> <outputFilePath>');
  process.exit(1);
}

const [inputFilePath, outputFilePath] = args;

// Call the processFile function with the provided paths
try {
  processFile(inputFilePath, outputFilePath);
} catch (error) {
  console.error(error.message);
}
