const { install, deleteFiles, lines, packageJson } = require('mrm-core');
const { cosmiconfig, hasHusky, removeMatch } = require('../utils');

const task = async () => {
  deleteFiles(cosmiconfig('lint-staged'));

  install(['lint-staged']);

  packageJson().merge({ 'lint-staged': {} }).save();

  if (hasHusky()) {
    const preCommit = '.husky/pre-commit';
    lines(preCommit)
      .set(removeMatch(lines(preCommit).get(), /lint-staged|undefined/))
      .add('npx lint-staged')
      .save();
  }
};

task.description = 'Add lint-staged';
module.exports = task;
