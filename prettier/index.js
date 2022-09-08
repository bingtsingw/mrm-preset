const { install, packageJson, lines, json, deleteFiles, template } = require('mrm-core');
const { cosmiconfig, hasTypescript, hasLintStaged, prettierConfig } = require('../utils');
const { join } = require('path');

const task = () => {
  deleteFiles(cosmiconfig('prettier'));

  template('.prettierignore', join(__dirname, '../templates/prettier/prettierignore')).apply().save();

  json('.vscode/settings.json').merge({ 'editor.defaultFormatter': 'esbenp.prettier-vscode' }).save();

  install(['prettier']);
  packageJson().setScript('format', 'prettier . --check').setScript('format:fix', 'prettier . --write').save();

  if (hasLintStaged()) {
    packageJson()
      .merge({
        'lint-staged': {
          '**/*.{js,jsx,ts,tsx,html,css,md,json}': 'prettier --check',
        },
      })
      .save();
  }

  prettierConfig()
    .set({
      printWidth: 120,
      singleQuote: true,
      trailingComma: 'all',
      proseWrap: 'never',
    })
    .save();

  if (hasTypescript()) {
    install(['prettier-plugin-organize-imports']);
    prettierConfig()
      .merge({ plugins: ['prettier-plugin-organize-imports'] })
      .save();
  }
};

task.description = 'Add prettier';
module.exports = task;
