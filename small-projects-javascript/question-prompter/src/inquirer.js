import inquirer from 'inquirer';
import { openWithVSCode } from './utils/exec';

const findFromData = (choice, userData) =>
  userData.find(data => data.name === choice);

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
            choices: userData.filter(entry => Boolean(entry.questions))
          }
        ])
        .then(prompt => {
          const choice = prompt.whichQuestions;
          const questionsToAnswer = findFromData(choice, userData).questions;
          return inquirer.prompt(questionsToAnswer);
        })
        .then(answersToQs => {
          console.log(answersToQs);
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
            choices: userData.filter(entry => Boolean(entry.path))
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
  const { content } = config; // todo: later, we can add "openWith"
  return inquirer.prompt(prompt1).then(answers => {
    const choice = answers.topLevel;
    return secondLevel[choice].cb(content);
  });
};
