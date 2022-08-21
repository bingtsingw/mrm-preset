const { template } = require('mrm-core');
const { join } = require('path');

const task = () => {

  const diff = '.gitignore';
  template(diff, join(__dirname, '../templates/gitignore/gitignore')).apply().save();
};

task.description = 'Add .gitignore';
module.exports = task;
