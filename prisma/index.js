const { chmodSync, existsSync } = require('fs');
const { install, packageJson, template, json } = require('mrm-core');
const { join } = require('path');
const { hasPrettier } = require('../utils');

const task = async () => {
  const { execa } = await import('execa');

  install(['prisma', 'del-cli']);

  packageJson()
    .setScript('prisma:diff', './prisma/diff.sh')
    .setScript('prisma:refresh', 'del-cli prisma/migrations && prisma migrate dev --name init --skip-generate')
    .setScript('prisma:run', 'prisma migrate dev --name init --skip-generate')
    .save();

  if (!existsSync('prisma')) {
    execa('npx prisma init');
  }

  const diff = 'prisma/diff.sh';
  template(diff, join(__dirname, '../templates/prisma/diff.sh')).apply().save();
  chmodSync(diff, 0755);

  json('.vscode/settings.json')
    .merge({
      '[prisma]': {
        'editor.defaultFormatter': 'Prisma.prisma',
      },
    })
    .save();

  if (hasPrettier) {
    install(['prettier-plugin-prisma']);
    json('.prettierrc.json')
      .merge({
        plugins: ['prettier-plugin-prisma'],
      })
      .save();
  }
};

task.description = 'Add prisma';
module.exports = task;
