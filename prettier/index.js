const { install, packageJson, lines, json, deleteFiles } = require('mrm-core');
const { cosmiconfig, hasTypescript } = require('../utils');

const task = () => {
  deleteFiles(cosmiconfig('prettier'));
  deleteFiles(['.prettierignore']);

  /**
   * Add .prettierrc.json file
   */
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

  /**
   * Add .prettierignore file
   */
  const prettierIgnore = lines('.prettierignore');
  prettierIgnore.add('# misc');
  prettierIgnore.add('.DS_Store');
  prettierIgnore.add('.eslintcache');
  prettierIgnore.add('yarn.lock');
  prettierIgnore.add('pnpm-lock.yaml');
  prettierIgnore.add('package-lock.json');
  prettierIgnore.add('node_modules');
  prettierIgnore.add('.husky');

  prettierIgnore.add('\n# ignored suffix');
  prettierIgnore.add('*.log');
  prettierIgnore.add('*.ico');
  prettierIgnore.add('*.svg');
  prettierIgnore.add('*.png');
  prettierIgnore.add('*ignore');
  prettierIgnore.add('.editorconfig');

  prettierIgnore.add('\n# ignore artifacts');
  prettierIgnore.add('build');
  prettierIgnore.add('coverage');
  prettierIgnore.add('dist');
  prettierIgnore.add('.umi');
  prettierIgnore.add('.umi-test');
  prettierIgnore.add('.umi-production');

  prettierIgnore.add('\n# project');
  prettierIgnore.add('src/components/iconfont');
  prettierIgnore.save();

  /**
   * Update vscode settings
   */
  json('.vscode/settings.json')
    .merge({
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
    })
    .save();

  /**
   * Update package file
   */
  packageJson().setScript('format', 'prettier --check .').setScript('format:fix', 'prettier --write .').save();

  /**
   * Install required dependencies
   */
  install(['prettier']);
  if (hasTypescript) {
    install(['prettier-plugin-organize-imports']);
  }
};

task.description = 'Add prettier';
module.exports = task;
