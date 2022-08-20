const { install, packageJson, deleteFiles } = require('mrm-core');

const task = async () => {
  const { execa } = await import('execa');

  deleteFiles(['.husky']);

  packageJson().setScript('prepare', "if [ -d './node_modules/husky' ]; then husky install; fi").save();
  install(['husky']);
  await execa('npx husky install');
};

task.description = 'Add husky';
module.exports = task;
