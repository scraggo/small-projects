const rejectWithErr = (err) => Promise.reject(err);

const errCallback = (err) => {
  console.error(err);
  process.exit();
};

const removeSourceParam = (link) => link.split('?source')[0];

const filterLine = (line, linksOnly = false) => {
  if (line === '') {
    return false;
  }
  if (linksOnly && !line.includes('(http')) {
    return false;
  }
  return true;
};

/**
 *
 * @param {string} text
 * @returns {array}
 */
const getParsedText = (text, linksOnly = false) =>
  text
    .split('\r\n')
    .filter((line) => filterLine(line, linksOnly))
    .map((line) => {
      const rawLink = line.split('(http')[1];
      if (!linksOnly && !rawLink) {
        return '\n' + line + '\n';
      }
      const link = `http${removeSourceParam(rawLink.replace(')', ''))}`;
      return `* <${link}>`;
    });

/**
 *
 * @param {object} data
 * @returns {string}
 */
const parseEmlData = (data) => {
  const { date = '', from, subject = '', text } = data;
  if (!from) {
    return '';
  }
  const { name = '', email = '' } = from;
  return `${date}\n${name} - ${email}\n${subject}

${getParsedText(text)
  .join('\n')
  .slice(0, 1000)}`;
};

module.exports = {
  errCallback,
  parseEmlData,
  rejectWithErr
};
