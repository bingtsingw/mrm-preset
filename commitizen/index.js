const { install, packageJson, deleteFiles, lines } = require('mrm-core');

const hasHusky = !!packageJson().get('devDependencies.husky');

const removeMatch = (lines, match) => {
  lines = lines.filter((value) => !value.match(match));
  return lines;
};

const task = async () => {
  deleteFiles([
    '.commitlintrc',
    '.commitlintrc.json',
    '.commitlintrc.yaml',
    '.commitlintrc.yml',
    '.commitlintrc.js',
    '.commitlintrc.cjs',
    '.commitlintrc.ts',
    'commitlint.config.js',
    'commitlint.config.cjs',
    'commitlint.config.ts',
  ]);
  deleteFiles(['.czrc']);

  install(['commitizen', 'cz-conventional-changelog']);
  packageJson().setScript('commit', 'cz').set('config.commitizen', { path: 'cz-conventional-changelog' }).save();

  install(['@commitlint/cli', '@commitlint/config-conventional']);
  packageJson()
    .set('commitlint', { extends: ['@commitlint/config-conventional'] })
    .save();

  if (hasHusky) {
    const commitMsg = '.husky/commit-msg';
    lines(commitMsg)
      .set(removeMatch(lines(commitMsg).get(), /commitlint/))
      .add('npx --no -- commitlint --edit $1')
      .save();
  }
};

task.description = 'Add commitizen';
module.exports = task;
