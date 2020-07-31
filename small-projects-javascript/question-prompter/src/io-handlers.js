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
    .then(async json => {
      return JSON.parse(json);
    });
};

export const createFileName = (choice, dir) => {
  const d = Date.now();
  const fileName = `${format(d, 'yyMMdd_HHmmss')}_${choice}.json`;
  return getBackupFileLocation(dir, fileName);
};

export const formatQAOutput = (choice, answersToQs) => {
  return JSON.stringify(
    {
      name: choice,
      entries: answersToQs
    },
    null,
    2
  );
};

export const writeQAToOutputDir = (textToWrite, filePath) =>
  writeFileAsync(filePath, textToWrite, 'utf8');
