"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("./utils/fs");

/**
 * Backup files from command line option
 * @param {object<Commander>} commander parsed commander options
 * @returns {Promise} resolves to undefined
 */
const backup = commander => {
  // config is required, or we don't get to this point
  const {
    config: path
  } = commander;
  return (0, _fs.existsAsync)(path).then(() => (0, _fs.readFileAsync)(path, {
    encoding: "utf8"
  })).then(async json => {
    const parsedConfig = JSON.parse(json);
    const {
      files,
      backupDirectory
    } = parsedConfig;
    const normalizedBackupDir = (0, _fs.resolvePath)(backupDirectory);
    const promises = files.map(file => (0, _fs.copyFileAsync)(file, normalizedBackupDir));
    await Promise.all(promises);
    console.log("Backups successful!");
    console.log(parsedConfig);
  }).catch(console.error);
};

var _default = backup;
exports.default = _default;