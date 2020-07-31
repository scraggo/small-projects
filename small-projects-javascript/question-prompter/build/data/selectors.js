"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntriesWithPath = exports.getQuestionsList = exports.getOutputPath = exports.getConfig = exports.getContent = void 0;

// keeping config data model access consistent
const getContent = config => config.content;

exports.getContent = getContent;

const getConfig = config => config.config;

exports.getConfig = getConfig;

const getOutputPath = config => getConfig(config).output;

exports.getOutputPath = getOutputPath;

const getQuestionsList = config => getContent(config).filter(entry => Boolean(entry.questions)).map(entry => {
  // console.log(entry);
  const {
    questions
  } = entry;
  const parsedQuestions = questions.map(q => {
    console.log(q);

    if (typeof q === 'string') {
      return {
        name: q
      };
    }

    return q;
  }); // eslint-disable-next-line no-param-reassign

  entry.questions = parsedQuestions;
  return entry;
});

exports.getQuestionsList = getQuestionsList;

const getEntriesWithPath = config => getContent(config).filter(entry => Boolean(entry.path));

exports.getEntriesWithPath = getEntriesWithPath;