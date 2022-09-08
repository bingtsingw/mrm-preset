const { install, packageJson, json, deleteFiles } = require('mrm-core');
const { cosmiconfig, hasLintStaged } = require('../utils');

const task = () => {
  deleteFiles(cosmiconfig('eslint'));
  deleteFiles('.eslintignore');

  json('.vscode/settings.json')
    .merge({
      'editor.codeActionsOnSave': { 'source.fixAll.eslint': true },
      'eslint.validate': ['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'],
      'eslint.alwaysShowStatus': true,
    })
    .save();

  install(['eslint']);

  packageJson()
    .setScript('lint:js', 'eslint . --cache --ext .js,.jsx,.ts,.tsx')
    .setScript('lint:js:fix', 'eslint . --cache --ext .js,.jsx,.ts,.tsx --fix')
    .merge({ eslintIgnore: ['dist', 'build', 'out'] })
    .save();

  if (hasLintStaged()) {
    packageJson()
      .merge({
        'lint-staged': {
          '**/*.{js,jsx,ts,tsx}': 'eslint',
        },
      })
      .save();
  }
};

task.description = 'Add eslint';
module.exports = task;
