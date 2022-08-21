const { template } = require('mrm-core');
const { join } = require('path');

const task = () => {

  const gitignore = '.gitignore';
  template(gitignore, join(__dirname, '../templates/gitignore/gitignore')).apply().save();
};

task.description = 'Add .gitignore';
module.exports = task;
