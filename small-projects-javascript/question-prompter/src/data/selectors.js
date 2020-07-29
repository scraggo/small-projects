// keeping config data model access consistent

export const getContent = config => config.content;

export const getQuestionsList = config =>
  getContent(config).filter(entry => Boolean(entry.questions));

export const getEntriesWithPath = config =>
  getContent(config).filter(entry => Boolean(entry.path));
