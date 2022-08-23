const { packageJson } = require('mrm-core');

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

const hasHusky = !!packageJson().get('devDependencies.husky');

const hasPrettier = !!packageJson().get('devDependencies.prettier');

const hasTypescript = !!packageJson().get('devDependencies.typescript');

const hasLintStaged = !!packageJson().get('devDependencies.lint-staged');

module.exports.removeMatch = removeMatch;
module.exports.cosmiconfig = cosmiconfig;
module.exports.prettierConfig = prettierConfig;
module.exports.hasHusky = hasHusky;
module.exports.hasPrettier = hasPrettier;
module.exports.hasTypescript = hasTypescript;
module.exports.hasLintStaged = hasLintStaged;
