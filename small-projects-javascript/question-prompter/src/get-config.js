import { existsAsync, readFileAsync } from './utils/fs';

export default commander => {
  // config is required, or we don't get to this point
  const { config: configPath } = commander;
  return existsAsync(configPath)
    .then(() => readFileAsync(configPath, { encoding: 'utf8' }))
    .then(async json => {
      return JSON.parse(json);
    });
};
