import inquirer from 'inquirer';
import { openConfigWithVSCode, openWithVSCode } from './utils/exec';
import { formatQAOutput, writeQAToOutputDir } from './io-handlers';
import * as selectors from './data/selectors';

const findFromData = (choice, userData) =>
  selectors.getContent(userData).find(data => data.name === choice);

const secondLevel = {
  answerQuestions: {
    name: 'Answer questions',
    value: 'answerQuestions',
    cb: async userData => {
      const prompt = await inquirer.prompt([
        {
          type: 'list',
          name: 'whichQuestions',
          message: 'Which questions do you want to answer?',
          choices: selectors.getQuestionsList(userData)
        }
      ]);
      const choice = prompt.whichQuestions;
      const { questions } = findFromData(choice, userData);

      const answers = await inquirer.prompt(questions);

      const filePath = await writeQAToOutputDir(
        formatQAOutput(choice, answers),
        choice,
        selectors.getOutputPath(userData)
      );
      console.log('Successfully saved to', filePath);
      console.log('Opening...');
      openWithVSCode(filePath);
    }
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
          openConfigWithVSCode(noteToView);
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
