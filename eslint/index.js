const { install, packageJson, json, deleteFiles } = require('mrm-core');
const { cosmiconfig, hasLintStaged } = require('../utils');

const task = () => {
  deleteFiles(cosmiconfig('eslint'));
  deleteFiles('.eslintignore');

  json('.vscode/settings.json')
    .merge({
      'editor.codeActionsOnSave': { 'source.fixAll.eslint': 'explicit' },
      'eslint.validate': ['javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'vue'],
    })
    .save();

  install(['eslint']);

  packageJson()
    .removeScript('lint')
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

  packageJson()
    .merge({
      eslintConfig: {
        overrides: [
          {
            files: ['*.config.js'],
            rules: {
              'import/no-commonjs': 'off',
              '@typescript-eslint/no-require-imports': 'off',
            },
          },
        ],
      },
    })
    .save();
};

task.description = 'Add eslint';
module.exports = task;
