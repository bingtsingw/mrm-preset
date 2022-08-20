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

const hasHusky = !!packageJson().get('devDependencies.husky');

const hasTypescript = !!packageJson().get('devDependencies.typescript');

module.exports.removeMatch = removeMatch;
module.exports.cosmiconfig = cosmiconfig;
module.exports.hasHusky = hasHusky;
module.exports.hasTypescript = hasTypescript;
