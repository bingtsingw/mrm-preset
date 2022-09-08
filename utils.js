const { packageJson } = require('mrm-core');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const removeMatch = (lines, match) => {
  lines = lines.filter((value) => !value.match(match));
  return lines;
};

const cosmiconfig = (name) => {
  const rcName = `.${name.replace('-', '')}rc`;
  const configs = [
    `${rcName}`,
    `${rcName}.json`,
    `${rcName}.json5`,
    `${rcName}.yaml`,
    `${rcName}.yml`,
    `${rcName}.js`,
    `${rcName}.cjs`,
    `${rcName}.mjs`,
    `${rcName}.ts`,
    `${name}.config.js`,
    `${name}.config.cjs`,
    `${name}.config.mjs`,
    `${name}.config.ts`,
  ];

  return configs;
};

const prettierConfig = () => ({
  set: (obj) => {
    return packageJson().set('prettier', obj);
  },
  merge: (obj) => {
    return packageJson().merge({ prettier: obj });
  },
  save: packageJson().save,
});

const hasHusky = () => !!packageJson().get('devDependencies.husky');

const hasEslint = () => !!packageJson().get('devDependencies.eslint');

const hasPrettier = () => !!packageJson().get('devDependencies.prettier');

const hasTypescript = () => !!packageJson().get('devDependencies.typescript');

const hasLintStaged = () => !!packageJson().get('devDependencies.lint-staged');

const hasReact = () => !!packageJson().get('dependencies.react');

const hasVue = () => !!packageJson().get('dependencies.vue');

module.exports = {
  capitalizeFirstLetter,
  removeMatch,
  cosmiconfig,
  prettierConfig,
  hasHusky,
  hasEslint,
  hasPrettier,
  hasTypescript,
  hasLintStaged,
  hasReact,
  hasVue,
};
