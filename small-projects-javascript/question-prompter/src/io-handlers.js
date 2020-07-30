import {
  existsAsync,
  getBackupFileLocation,
  readFileAsync,
  resolvePath,
  writeFileAsync
} from './utils/fs';

export const getConfig = commander => {
  // config is required, or we don't get to this point
  const { config } = commander;
  const configPath = resolvePath(config);
  return existsAsync(configPath)
    .then(() => readFileAsync(configPath, { encoding: 'utf8' }))
    .then(async json => {
      return JSON.parse(json);
    });
};

export const writeQAToOutputDir = (
  textToWrite,
  backupDirAbsolute,
  fileName
) => {
  const filePath = getBackupFileLocation(backupDirAbsolute, fileName);
  // console.log(fileName, textToWrite);
  return writeFileAsync(filePath, textToWrite, 'utf8');
};
