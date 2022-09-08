const { install, packageJson, deleteFiles, lines } = require('mrm-core');
const { cosmiconfig, hasHusky, removeMatch } = require('../utils');

const task = async () => {
  const { execa } = await import('execa');

  deleteFiles(cosmiconfig('commitlint'));
  deleteFiles(['.czrc']);

  install(['commitizen', 'cz-conventional-changelog']);
  packageJson().setScript('commit', 'cz').set('config.commitizen', { path: 'cz-conventional-changelog' }).save();

  install(['@commitlint/cli', '@commitlint/config-conventional']);
  packageJson()
    .set('commitlint', { extends: ['@commitlint/config-conventional'] })
    .save();

  if (hasHusky()) {
    const commitMsg = '.husky/commit-msg';

    await execa(`npx husky add ${commitMsg}`, { shell: true });

    lines(commitMsg)
      .set(removeMatch(lines(commitMsg).get(), /commitlint|undefined/))
      .add('npx --no -- commitlint --edit $1')
      .save();
  }
};

task.description = 'Add commitizen';
module.exports = task;
