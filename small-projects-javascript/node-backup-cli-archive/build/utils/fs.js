"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFileAsync = exports.getBackupFileLocation = exports.getFileName = exports.resolvePath = exports.existsAsync = exports.readFileAsync = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  promises
} = _fs.default;
const readFileAsync = promises.readFile;
/**
 * Checks if a file or directory exists
 * @param {string} path file or directory path
 * @returns {Promise} resolved with true or rejected with an error
 */

exports.readFileAsync = readFileAsync;
const existsAsync = promises.access;
/**
 * If path begins with '~', turn into an absolute path
 * @param {string} filepath path of file or directory
 * @returns {string} expanded path
 */

exports.existsAsync = existsAsync;

const expandHome = filepath => {
  if (filepath[0] === "~") {
    return _path.default.join(_os.default.homedir(), filepath.slice(1));
  }

  return filepath;
};
/**
 * @param {string} filePath path of file or directory
 * @returns {string} see return of `expandHome`
 */


const resolvePath = filePath => _path.default.resolve(expandHome(filePath));
/**
 * @param {string} filepath path of file or directory: ie 'path/to/index.html'
 * @returns {string} filename without directory: ie 'index.html'
 */


exports.resolvePath = resolvePath;

const getFileName = filepath => _path.default.basename(filepath);
/**
 * @param {string} backupDirAbsolute backup directory
 * @param {string} filepath path of file or directory
 * @returns {string} backup file location
 */


exports.getFileName = getFileName;

const getBackupFileLocation = (backupDirAbsolute, filepath) => {
  const fileName = getFileName(filepath);
  return _path.default.join(backupDirAbsolute, fileName);
};
/**
 * This does more than fs.copyFile.
 * It allows for '~' in paths and creates a new path for the backup file location.
 * @param {string} fileToCopy path of file or directory
 * @param {string} backupDirAbsolute backup directory
 * @returns {Promise} resolves with what copyFileAsync returns
 */


exports.getBackupFileLocation = getBackupFileLocation;

const copyFileAsync = (fileToCopy, backupDirAbsolute) => {
  const absFilePath = resolvePath(fileToCopy);
  return promises.copyFile(absFilePath, getBackupFileLocation(backupDirAbsolute, absFilePath));
};

exports.copyFileAsync = copyFileAsync;