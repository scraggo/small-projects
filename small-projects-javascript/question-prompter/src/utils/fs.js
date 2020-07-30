import fs from 'fs';
import os from 'os';
import path from 'path';

const { promises } = fs;

/**
 * @typedef {string} ExpandedPath can include '~'
 */

export const readFileAsync = promises.readFile;
export const writeFileAsync = promises.writeFile;

/**
 * Checks if a file or directory exists
 * @param {string} path file or directory path
 * @returns {Promise} resolved with true or rejected with an error
 */
export const existsAsync = promises.access;

/**
 * If path begins with '~', turn into an absolute path
 * @param {string} filepath path of file or directory
 * @returns {ExpandedPath} expanded path
 */
const expandHome = filepath => {
  if (filepath[0] === '~') {
    return path.join(os.homedir(), filepath.slice(1));
  }
  return filepath;
};

/**
 * @param {string} filePath path of file or directory
 * @returns {ExpandedPath} expanded path
 */
export const resolvePath = filePath => path.resolve(expandHome(filePath));

/**
 * @param {string} filepath path of file or directory: ie 'path/to/index.html'
 * @returns {string} filename without directory: ie 'index.html'
 */
export const getFileName = filepath => path.basename(filepath);

/**
 * @param {string} backupDirAbsolute backup directory
 * @param {string} filepath path of file or directory
 * @returns {string} backup file location
 */
export const getBackupFileLocation = (backupDirAbsolute, filepath) => {
  const fileName = getFileName(filepath);
  const resolvedDir = resolvePath(backupDirAbsolute);
  return path.join(resolvedDir, fileName);
};

/**
 * This does more than fs.copyFile.
 * It allows for '~' in paths and creates a new path for the backup file location.
 * @param {string} fileToCopy path of file or directory
 * @param {string} backupDirAbsolute backup directory
 * @returns {Promise} resolves with what copyFileAsync returns
 */
export const copyFileAsync = (fileToCopy, backupDirAbsolute) => {
  const absFilePath = resolvePath(fileToCopy);
  return promises.copyFile(
    absFilePath,
    getBackupFileLocation(backupDirAbsolute, absFilePath)
  );
};
