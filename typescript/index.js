const { json, install } = require('mrm-core');

const task = () => {
  json('tsconfig.json').merge({ compilerOptions: {} }).save();

  json('.vscode/settings.json').merge({ 'typescript.tsdk': './node_modules/typescript/lib' }).save();

  install(['typescript', '@types/node']);
};

task.description = 'Add typescript';
module.exports = task;
