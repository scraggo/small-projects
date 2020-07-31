import { format } from 'date-fns';

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
    .then(json => JSON.parse(json));
};

/**
 * Filenames will be unique once per second
 * @param {string} choice result
 * @param {string} dir from config
 * @returns {string} BackupFileLocation
 */
export const createFileName = (choice, dir) => {
  const d = Date.now();
  const fileName = `${format(d, 'yyMMdd_HHmmss')}_${choice}.json`;
  return getBackupFileLocation(dir, fileName);
};

export const formatQAOutput = (choice, answersToQs) =>
  JSON.stringify(
    {
      name: choice,
      entries: answersToQs
    },
    null,
    2
  );

export const writeQAToOutputDir = async (textToWrite, choice, dir) => {
  try {
    let filePath = createFileName(choice, dir);
    const exists = await existsAsync(filePath);
    if (!exists) {
      await writeFileAsync(filePath, textToWrite, 'utf8');
      return filePath;
    }
    console.log('Waiting...');
    // retry after 1.2 seconds for unique filename
    await new Promise(resolve => setTimeout(resolve, 1200));
    filePath = createFileName(choice, dir);
    writeFileAsync(filePath, textToWrite, 'utf8');
    return filePath;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
