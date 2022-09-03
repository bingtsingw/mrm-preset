const { install, packageJson } = require('mrm-core');

const task = async () => {
  packageJson()
    .set('eslintConfig', {
      extends: ['next/core-web-vitals', 'alloy', 'alloy/react', 'alloy/typescript'],
    })
    .save();

  install(['eslint-config-alloy']);
};

module.exports.description = 'Config nextjs project';
module.exports = task;
