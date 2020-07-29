// import backup from './backup';
import commander from './commander';
import getConfig from './get-config';
import inquirer from './inquirer';

const main = () =>
  getConfig(commander).then(config => {
    return inquirer(config);
  });

main();
