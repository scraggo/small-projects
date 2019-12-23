import cheerio from 'cheerio';

import { readFileAsync } from './fs';

export const getCheerioFile = async filepath => {
  const file = await readFileAsync(filepath, { encoding: 'utf8' });
  return cheerio.load(file);
};
