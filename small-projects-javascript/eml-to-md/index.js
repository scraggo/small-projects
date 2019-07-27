const fs = require('fs');
const path = require('path');

const {
  emlReadAsync,
  getFilePath,
  readdirAsync,
  readFileAsync,
  writeFileAsync
} = require('./filesystem');

const { errCallback, parseEmlData, rejectWithErr } = require('./utils');

/**
 *
 * @param {string} text raw eml file
 * @param {boolean} linksOnly
 * @returns {Promise<string>} parsed text
 */
const getProcessedEmlAsText = (text, linksOnly) =>
  emlReadAsync(text)
    .then((data) => {
      console.log(parseEmlData(data, linksOnly));
      return parseEmlData(data, linksOnly);
    })
    .catch(rejectWithErr);

/**
 * @param {string} filepath
 * @param {boolean} linksOnly
 * @returns {Promise} resolved with {string} processed text
 */
const getFileText = (filepath, linksOnly) =>
  readFileAsync(filepath, { encoding: 'utf8' })
    .then((text) => getProcessedEmlAsText(text, linksOnly))
    .catch(rejectWithErr);

/**
 *
 * @param {object} argMap
 * @param {string} argMap.dir
 * @returns {Promise} resolved with {string[]} filenames
 */
const getAllFileNamesInDir = ({ dir }) =>
  readdirAsync(dir).catch(rejectWithErr);

/**
 *
 * @param {string[]} files
 * @param {object} argMap
 * @param {string} argMap.dir
 * @returns {Promise<string[]>} resolved with {string[]} file text from each file in files
 */
const getProcessedFiles = (files, { dir, linksOnly }) => {
  const filesPromiseArr = files
    .filter((file) => file.endsWith('.eml'))
    .map((file) => getFileText(getFilePath(dir, file), linksOnly));
  return Promise.all(filesPromiseArr).catch(rejectWithErr);
};

/**
 * Writes all results to a single file
 * @param {string[]} resultArr
 * @param {object} argMap
 * @param {string} argMap.dir
 * @param {string} argMap.outputFilename
 * @returns {undefined}
 */
const writeResultsToFile = (resultArr, { dir, outputFilename }) => {
  const newFilename = path.join(dir, outputFilename);

  if (fs.existsSync(newFilename)) {
    throw new Error('File already exists: ' + newFilename);
  }
  const newFile = resultArr.join('\n\n');
  return writeFileAsync(newFilename, newFile)
    .then(() => {
      console.log('The file was saved!', newFilename);
    })
    .catch(rejectWithErr);
};

const main = () => {
  const args = process.argv;

  if (args.length < 3) {
    console.log('Usage: <directory> {OPTIONS}');
    console.log(
      'OPT:  --linksOnly - Pass in to get the email as a list of links only.',
      'OPT:  --output=<output filename> - output filename'
    );
    process.exit();
  }

  const dir = args[2];
  const linksOnly = args.includes('--linksOnly');
  const outputFilename =
    args
      .filter((arg) => arg.startsWith('--output'))
      .map((str) => str.split('=')[1])[0] || '_result.md';

  const argMap = {
    dir,
    linksOnly,
    outputFilename
  };
  getAllFileNamesInDir(argMap)
    .then((files) => getProcessedFiles(files, argMap))
    .then((arrOfResults) => writeResultsToFile(arrOfResults, argMap))
    .then(() => {
      console.log('All done!');
    })
    .catch(errCallback);
};

main();
