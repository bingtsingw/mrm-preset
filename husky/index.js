const { install, packageJson, deleteFiles } = require('mrm-core');

const task = async () => {
  const { execa } = await import('execa');

  deleteFiles(['.husky']);

  packageJson().setScript('prepare', "if [ -d './node_modules/husky' ]; then husky; fi").save();
  install(['husky']);
  await execa('npx husky init', { shell: true });
};

task.description = 'Add husky';
module.exports = task;
