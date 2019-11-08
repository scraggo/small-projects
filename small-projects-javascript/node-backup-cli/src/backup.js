import {
  copyFileAsync,
  existsAsync,
  readFileAsync,
  resolvePath
} from "./utils/fs";

/**
 * Backup files from command line option
 * @param {object<Commander>} commander parsed commander options
 * @returns {Promise} resolves to undefined
 */
const backup = commander => {
  // config is required, or we don't get to this point
  const { config: path } = commander;

  return existsAsync(path)
    .then(() => readFileAsync(path, { encoding: "utf8" }))
    .then(async json => {
      const parsedConfig = JSON.parse(json);
      const { files, backupDirectory } = parsedConfig;

      const normalizedBackupDir = resolvePath(backupDirectory);

      const promises = files.map(file =>
        copyFileAsync(file, normalizedBackupDir)
      );

      await Promise.all(promises);

      /* eslint-disable no-console */
      console.log("Backups successful!");
      console.log(parsedConfig);
    })
    .catch(console.error);
  /* eslint-enable */
};

export default backup;
