const { install, json } = require('mrm-core');

const task = async () => {
  const { execa } = await import('execa');

  install(['tailwindcss', 'postcss', 'autoprefixer']);
  await execa('npx tailwindcss init -p', { shell: true });

  json('.vscode/settings.json')
    .merge({
      'tailwindCSS.includeLanguages': {
        plaintext: 'javascript',
      },
    })
    .save();
};

task.description = 'Add tailwind';
module.exports = task;
