const fs = require('fs');
const path = require('path');

function getFilename(inputString) {
  // Replace all non-alphanumeric characters with an empty string
  let sanitized = inputString.replace(/[^a-zA-Z0-9\s]/g, '');
  // Replace all spaces with underscores
  sanitized = sanitized.replace(/\s+/g, '_');
  return sanitized + '.md';
}

function splitMarkdown(inputFilepath, outputDir) {
  outputDir = outputDir || path.dirname(inputFilepath);
  const lines = fs.readFileSync(inputFilepath, 'utf8').split('\n');
  // let fileIndex = 1;
  let currentSection = '';
  let currentHeading = '';

  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      // If there's a previous section, write it to a file
      if (currentSection) {
        // const fileName = currentHeading.replace(/[^a-zA-Z0-9_]/g, '_') + '.md';
        const fileName = getFilename(currentHeading);
        fs.writeFileSync(path.join(outputDir, fileName), currentSection);
        currentSection = '';
      }
      // Update the current heading
      currentHeading = line.substring(3).trim();
    } else {
      if (index === 0) {
        // Auto generate a section 0 (hopefully this doesn't cause a collision)
        currentHeading = 'section 000 auto generated';
      }
      // Add the line to the current section
      currentSection += line + '\n';
    }

    // Handle the last section if it's the last line
    if (index === lines.length - 1 && currentSection) {
      const fileName = getFilename(currentHeading);
      fs.writeFileSync(path.join(outputDir, fileName), currentSection);
    }
  });
}

// Example usage
splitMarkdown('input/path', 'input/path/output');
