const { install, packageJson, template } = require('mrm-core');
const { join } = require('path');

const task = () => {
  const releaseJson = '.release-it.json';
  template(releaseJson, join(__dirname, '../templates/release-it/release-it.txt')).apply().save();

  packageJson().setScript('release', 'release-it').save();

  install(['release-it', '@release-it/conventional-changelog']);
};

task.description = 'Add release-it';
module.exports = task;
