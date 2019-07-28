const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const emlformat = require('eml-format');

const emlReadAsync = promisify(emlformat.read);
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const getFilePath = (dir, filename) => path.join(dir, filename);

module.exports = {
  emlReadAsync,
  getFilePath,
  readdirAsync,
  readFileAsync,
  writeFileAsync
};
