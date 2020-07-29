import { execSync } from 'child_process';
import { existsAsync, resolvePath } from './fs';

// todo: allow to open with 'default' or user specified other
export const openWithVSCode = filePath => {
  const resolvedPath = resolvePath(filePath);
  existsAsync(resolvedPath)
    .then(() => execSync(`code ${resolvedPath}`))
    .catch(err => {
      console.error('The "path" specified in config file wasn\'t found.');
      console.error(err.message);
    });
};
