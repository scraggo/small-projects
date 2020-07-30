import inquirer from 'inquirer';
import { openWithVSCode } from './utils/exec';
import { writeQAToOutputDir } from './io-handlers';
import * as selectors from './data/selectors';

const findFromData = (choice, userData) =>
  selectors.getContent(userData).find(data => data.name === choice);

const formatQAOutput = (choice, answersToQs) => {
  return JSON.stringify(
    {
      name: choice,
      entries: answersToQs
    },
    null,
    2
  );
};

const secondLevel = {
  answerQuestions: {
    name: 'Answer questions',
    value: 'answerQuestions',
    cb: userData =>
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'whichQuestions',
            message: 'Which questions do you want to answer?',
            choices: selectors.getQuestionsList(userData)
          }
        ])
        .then(async prompt => {
          const choice = prompt.whichQuestions;
          const questionsToAnswer = findFromData(choice, userData).questions;
          const answersToQs = await inquirer.prompt(questionsToAnswer);
          // todo: human readable Date 20200729_uniqueId
          const fileName = `${Date.now()}_${choice}_answers.json`;
          console.log(
            `saving your answers to ${selectors.getOutputPath(
              userData
            )}/${fileName}`
          );
          writeQAToOutputDir(
            formatQAOutput(choice, answersToQs),
            selectors.getOutputPath(userData),
            fileName
          );
        })
  },
  lookAtNotes: {
    name: 'Look at notes',
    value: 'lookAtNotes',
    cb: userData =>
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'whichNote',
            message: 'What note do you want to read?',
            choices: selectors.getEntriesWithPath(userData)
          }
        ])
        .then(prompt => {
          const choice = prompt.whichNote;
          const noteToView = findFromData(choice, userData).path;
          console.log(`Opening ${noteToView}...`);
          openWithVSCode(noteToView);
        })
  }
};

const prompt1 = [
  {
    type: 'list',
    name: 'topLevel',
    message: 'What do you want to do?',
    choices: [secondLevel.answerQuestions, secondLevel.lookAtNotes]
  }
];

export default config => {
  return inquirer.prompt(prompt1).then(answers => {
    const choice = answers.topLevel;
    return secondLevel[choice].cb(config);
  });
};
