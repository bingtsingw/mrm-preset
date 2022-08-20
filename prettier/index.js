const { install, packageJson, lines, json, deleteFiles, template } = require('mrm-core');
const { cosmiconfig, hasTypescript, hasLintStaged } = require('../utils');
const { join } = require('path');

const task = () => {
  deleteFiles(cosmiconfig('prettier'));
  deleteFiles(['.prettierignore']);

  const prettierrc = json('.prettierrc.json');
  prettierrc.merge({
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
    proseWrap: 'never',
  });
  if (hasTypescript) {
    prettierrc.merge({
      plugins: ['prettier-plugin-organize-imports'],
    });
  }
  prettierrc.save();

  template('.prettierignore', join(__dirname, '../templates/prettier/prettierignore')).apply().save();

  json('.vscode/settings.json')
    .merge({
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
    })
    .save();

  install(['prettier']);
  if (hasTypescript) {
    install(['prettier-plugin-organize-imports']);
  }
  packageJson().setScript('format', 'prettier --check .').setScript('format:fix', 'prettier --write .').save();

  if (hasLintStaged) {
    packageJson()
      .merge({
        'lint-staged': {
          '**/*.{js,ts,html,css,md,json}': 'prettier --check',
        },
      })
      .save();
  }
};

task.description = 'Add prettier';
module.exports = task;
