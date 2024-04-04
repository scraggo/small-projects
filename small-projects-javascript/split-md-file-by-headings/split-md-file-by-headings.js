const fs = require('fs');
const path = require('path');

function getFilename(inputString) {
  // Replace all non-alphanumeric characters with an empty string
  let sanitized = inputString.replace(/[^a-zA-Z0-9\s]/g, '');
  // Replace all spaces with underscores
  sanitized = sanitized.replace(/\s+/g, '_');
  return sanitized + '.md';
}

function writeContent({
  fileIndex,
  heading,
  section,
  prependContent, // optional, hook to add metadata
  outputDir,
}) {
  // const fileName = getFilename(heading);
  const fileName = String(fileIndex).padStart(2, '0') + getFilename(heading);
  const contentToPrepend = prependContent ? prependContent(heading) : '';
  const content = contentToPrepend + section;
  fs.writeFileSync(path.join(outputDir, fileName), content);
}

function splitMarkdown(
  inputFilepath,
  { outputDir, prependContent } = {
    outputDir: undefined, // optional, hook to add metadata
    prependContent: undefined,
  }
) {
  outputDir = outputDir || path.dirname(inputFilepath);
  const lines = fs.readFileSync(inputFilepath, 'utf8').split('\n');
  let fileIndex = 1;
  let currentSection = '';
  let currentHeading = '';

  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      // If there's a previous section, write it to a file
      if (currentSection) {
        // const fileName = currentHeading.replace(/[^a-zA-Z0-9_]/g, '_') + '.md';
        writeContent({
          fileIndex,
          heading: currentHeading,
          section: currentSection,
          prependContent,
          outputDir,
        });
        currentSection = '';
        fileIndex += 1;
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
      writeContent({
        fileIndex,
        heading: currentHeading,
        section: currentSection,
        prependContent,
        outputDir,
      });
    }
  });
}

// Example usage
splitMarkdown(
  './markdown-file-ex.md', // input path
  {
    outputDir: '../.idea/split-md-output',
    prependContent: (heading) => `---
title: "${heading.replace(/"/g, '_')}"
---\n\n`,
  }
);
