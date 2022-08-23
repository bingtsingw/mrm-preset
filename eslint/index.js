const { install, packageJson, json, deleteFiles, template } = require('mrm-core');
const { cosmiconfig, hasLintStaged } = require('../utils');
const { join } = require('path');

const task = () => {
  deleteFiles(cosmiconfig('eslint'));
  deleteFiles('.eslintignore');

  json('.vscode/settings.json')
    .merge({
      'editor.codeActionsOnSave': { 'source.fixAll.eslint': true },
      'eslint.alwaysShowStatus': true,
    })
    .save();

  install(['eslint']);

  packageJson()
    .setScript('lint:js', 'eslint . --cache --ext .js,.jsx,.ts,.tsx')
    .setScript('lint:js:fix', 'eslint . --cache --ext .js,.jsx,.ts,.tsx --fix')
    .merge({ eslintIgnore: ['dist', 'build'] })
    .save();

  if (hasLintStaged) {
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
