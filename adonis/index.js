const { install, packageJson } = require('mrm-core');

const task = async () => {
  packageJson()
    .removeScript('lint')
    .set('eslintConfig', {
      plugins: ['prettier'],
      extends: ['plugin:adonis/typescriptApp', 'prettier'],
      rules: {
        'prettier/prettier': ['error'],
      },
    })
    .save();

  install(['eslint-config-prettier', 'eslint-plugin-adonis', 'eslint-plugin-prettier']);
};

module.exports.description = 'Config adonis project';
module.exports = task;
