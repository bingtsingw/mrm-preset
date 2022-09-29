const { chmodSync, existsSync } = require('fs');
const { packageJson, template } = require('mrm-core');
const { join } = require('path');

const task = async () => {
  const { execa } = await import('execa');

  packageJson().setScript('build', 'malagu build -m fc').setScript('deploy', './scripts/deploy.sh').save();

  if (!existsSync('prisma')) {
    await execa('npx prisma init', { shell: true });
  }

  const diff = 'scripts/deploy.sh';
  template(diff, join(__dirname, '../templates/malagu/deploy.sh')).apply().save();
  chmodSync(diff, 0o755);
};

task.description = 'Add malagu';
module.exports = task;
