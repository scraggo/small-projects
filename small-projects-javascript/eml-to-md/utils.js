const rejectWithErr = (err) => Promise.reject(err);

const errCallback = (err) => {
  console.error(err);
  process.exit();
};

const removeSourceParam = (link) => link.split('?source')[0];

const filterLine = (line, linksOnly) => {
  if (line === '' || (linksOnly && !line.includes('(http'))) {
    return false;
  }
  return true;
};

/**
 *
 * @param {string} text
 * @param {boolean} [linksOnly]
 * @returns {array}
 */
const getParsedText = (text, linksOnly) =>
  text
    .split('\r\n')
    .filter((line) => filterLine(line, linksOnly))
    .map((line) => {
      const rawLink = line.split('(http')[1];
      if (!rawLink) {
        return linksOnly ? '' : `\n${line}\n`;
      }
      const link = `http${removeSourceParam(rawLink.replace(')', ''))}`;
      return `* <${link}>`;
    });

/**
 *
 * @param {object} data
 * @param {boolean} [linksOnly=false]
 * @returns {string}
 */
const parseEmlData = (data, linksOnly = false) => {
  const { date = '', from = {}, subject = '', text } = data;
  const { name = '', email = '' } = from;
  return `## ${subject}\n\n${name} - ${email}\n${date}

${getParsedText(text, linksOnly).join('\n')}\n\n\n`;
};

module.exports = {
  errCallback,
  parseEmlData,
  rejectWithErr
};
