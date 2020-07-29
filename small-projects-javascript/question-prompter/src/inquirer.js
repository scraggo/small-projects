import inquirer from 'inquirer';

import exampleData from './example/example.json';

const findFromData = choice => exampleData.find(data => data.name === choice);

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
            choices: userData
          }
        ])
        .then(prompt => {
          const choice = prompt.whichQuestions;
          const questionsToAnswer = findFromData(choice).questions;
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
            choices: userData
          }
        ])
        .then(prompt => {
          const choice = prompt.whichNote;
          const noteToView = findFromData(choice).path;
          console.log(noteToView);
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

export default commander => {
  const { config: path } = commander;
  console.log(path || 'no path entered');
  // get user data...
  const userData = exampleData;
  inquirer.prompt(prompt1).then(answers => {
    const choice = answers.topLevel;
    return secondLevel[choice].cb(userData);
  });
};
