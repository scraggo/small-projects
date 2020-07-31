// keeping config data model access consistent

export const getContent = config => config.content;
export const getConfig = config => config.config;
export const getOutputPath = config => getConfig(config).output;

export const getQuestionsList = config =>
  getContent(config)
    .filter(entry => Boolean(entry.questions))
    .map(entry => {
      // re-map simple questions to inquirer's format
      const { questions } = entry;
      const parsedQuestions = questions.map(q => {
        if (typeof q === 'string') {
          return {
            name: q
          };
        }
        return q;
      });

      // eslint-disable-next-line no-param-reassign
      entry.questions = parsedQuestions;
      return entry;
    });

export const getEntriesWithPath = config =>
  getContent(config).filter(entry => Boolean(entry.path));
