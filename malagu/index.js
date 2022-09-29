const { chmodSync } = require('fs');
const { packageJson, template } = require('mrm-core');
const { join } = require('path');

const task = async () => {
  packageJson().setScript('build', 'malagu build -m fc').setScript('deploy', './scripts/deploy.sh').save();

  const diff = 'scripts/deploy.sh';
  template(diff, join(__dirname, '../templates/malagu/deploy.sh')).apply().save();
  chmodSync(diff, 0o755);
};

task.description = 'Add malagu';
module.exports = task;
