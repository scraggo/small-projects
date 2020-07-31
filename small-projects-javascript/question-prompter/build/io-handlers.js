"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeQAToOutputDir = exports.formatQAOutput = exports.createFileName = exports.getConfig = void 0;

var _dateFns = require("date-fns");

var _fs = require("./utils/fs");

const getConfig = commander => {
  // config is required, or we don't get to this point
  const {
    config
  } = commander;
  const configPath = (0, _fs.resolvePath)(config);
  return (0, _fs.existsAsync)(configPath).then(() => (0, _fs.readFileAsync)(configPath, {
    encoding: 'utf8'
  })).then(async json => {
    return JSON.parse(json);
  });
};
/**
 * Filenames will be unique once per second
 * @param {string} choice result
 * @param {string} dir from config
 * @returns {string} BackupFileLocation
 */


exports.getConfig = getConfig;

const createFileName = (choice, dir) => {
  const d = Date.now();
  const fileName = `${(0, _dateFns.format)(d, 'yyMMdd_HHmmss')}_${choice}.json`;
  return (0, _fs.getBackupFileLocation)(dir, fileName);
};

exports.createFileName = createFileName;

const formatQAOutput = (choice, answersToQs) => {
  return JSON.stringify({
    name: choice,
    entries: answersToQs
  }, null, 2);
};

exports.formatQAOutput = formatQAOutput;

const writeQAToOutputDir = async (textToWrite, choice, dir) => {
  try {
    let filePath = createFileName(choice, dir);
    const exists = await (0, _fs.existsAsync)(filePath);

    if (!exists) {
      await (0, _fs.writeFileAsync)(filePath, textToWrite, 'utf8');
      return filePath;
    }

    console.log('Waiting...'); // retry after 1.2 seconds for unique filename

    await new Promise(resolve => setTimeout(resolve, 1200));
    filePath = createFileName(choice, dir);
    (0, _fs.writeFileAsync)(filePath, textToWrite, 'utf8');
    return filePath;
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.writeQAToOutputDir = writeQAToOutputDir;