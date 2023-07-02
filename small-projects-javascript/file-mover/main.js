// @ts-check
const { execSync } = require('node:child_process');

const { dirFrom, dirTo, filenames } = require('./config');

const sleepTime = 0;
const getCMD = (filename) => {
  return `mv "${dirFrom}/${filename}" "${dirTo}" && echo "moved ${filename}"; \nsleep ${sleepTime};`;
};

// `input`.split('\n').forEach(cb);
filenames.split('\n').forEach((filename) => {
  const cmd = getCMD(filename);
  try {
    execSync(cmd);
  } catch (error) {
    console.error(error);
  }
});
