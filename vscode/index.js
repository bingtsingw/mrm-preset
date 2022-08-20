const { json } = require('mrm-core');

const task = () => {
  json('.vscode/settings.json')
    .merge({
      'editor.formatOnSave': true,
      'editor.autoClosingQuotes': 'always',
      'editor.quickSuggestions': {
        strings: true,
      },
    })
    .save();
};

task.description = 'Add vscode settings';
module.exports = task;
