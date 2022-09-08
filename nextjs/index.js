const { install, packageJson, deleteFiles } = require('mrm-core');

const task = async () => {
  deleteFiles(['public/vercel.svg', 'styles', 'pages']);

  packageJson()
    .merge({ eslintConfig: { extends: ['next/core-web-vitals'] } })
    .save();

  install(['axios', 'lodash', 'class-transformer', 'reflect-metadata', '@tanstack/react-query'], { dev: false });
  install(['@types/lodash']);
};

module.exports.description = 'Config nextjs project';
module.exports = task;
