const { template } = require('mrm-core');
const { join } = require('path');
const gitUserName = require('git-user-name');

const task = () => {
  const mit = 'LICENSE';
  template(mit, join(__dirname, '../templates/mit/mit.txt'))
    .apply({
      year: new Date().getFullYear(),
      fullname: gitUserName(),
    })
    .save();
};

task.description = 'Add MIT License';
module.exports = task;
