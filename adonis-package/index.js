const { ini, deleteFiles, install, packageJson } = require('mrm-core');
const { capitalizeFirstLetter } = require('../utils');

const task = () => {
  const packageName = packageJson().get('name', '');

  if (!packageName) {
    throw new Error('please set "name" property in package.json first');
  }

  const name = packageName.split('/').pop().replace('adonis-', '');

  if (!name) {
    throw new Error('can not parse "name" property in package.json');
  }

  const providerName = `${capitalizeFirstLetter(name)}Provider`;

  install(['@adonisjs/core', 'del-cli', 'copyfiles']);

  packageJson()
    .setScript('clean', 'del-cli build')
    .setScript('compile', 'npm run lint:js && npm run clean && tsc')
    .setScript('copyfiles', 'copyfiles "templates/**/*.txt" "instructions.md" build')
    .setScript('build', 'npm run compile && npm run copyfiles')
    .set('main', `build/providers/${providerName}.js`)
    .set('exports', {
      '.': {
        types: './build/adonis-typings/index.d.ts',
        require: `./build/providers/${providerName}.js`,
      },
      './config': './build/config.js',
      './build/config': './build/config.js',
      './*': './*',
    })
    .set('files', [
      'build/adonis-typings',
      'build/providers',
      'build/src',
      'build/config.js',
      'build/config.d.ts',
      'build/templates',
      'build/instructions.md',
    ])
    .set('types', 'build/adonis-typings/index.d.ts')
    .set('adonisjs', {
      instructionsMd: './build/instructions.md',
      templates: {
        config: [
          {
            src: 'config.txt',
            dest: name,
          },
        ],
        contracts: [
          {
            src: 'contract.txt',
            dest: name,
          },
        ],
      },
      types: packageName,
      providers: [packageName],
      env: {},
    })
    .save();

  install(['eslint-config-prettier', 'eslint-plugin-adonis', 'eslint-plugin-prettier']);
  packageJson()
    .set('eslintConfig', {
      extends: ['plugin:adonis/typescriptPackage', 'prettier'],
      plugins: ['prettier'],
      rules: { 'prettier/prettier': ['error'] },
    })
    .save();
};

task.description = 'Config adonis package project';
module.exports = task;
