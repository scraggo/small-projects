import commander from 'commander';

commander
  .version('0.0.1')
  .requiredOption('-i, --input <path>', 'Path to bookmarks html file')
  .option(
    '-o, --output <path>',
    'Path to output csv file (optional). If not specified, <inputName.csv> will be used.'
  )
  .parse(process.argv);

export default commander;
