const { install, packageJson } = require('mrm-core');
const { hasEslint, hasTypescript, hasReact, hasVue } = require('../utils');

const task = () => {
  if (!hasEslint()) {
    console.warn('eslint is not found, quit alloy task');
    return;
  }

  install(['@babel/core', '@babel/eslint-parser', 'eslint-config-alloy']);

  const pkg = packageJson();
  pkg.merge({ eslintConfig: { extends: ['alloy'] } });

  if (hasReact()) {
    install(['@babel/preset-react', 'eslint-plugin-react']);
    pkg.merge({ eslintConfig: { extends: ['alloy/react'] } });
  } else if (hasVue()) {
    install(['vue-eslint-parser', 'eslint-plugin-vue']);
    pkg.merge({ eslintConfig: { extends: ['alloy/vue'] } });
  }

  if (hasTypescript()) {
    install(['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin']);
    pkg.merge({ eslintConfig: { extends: ['alloy/typescript'] } });

    if (hasVue()) {
      install(['@vue/eslint-config-typescript']);
      pkg.merge({
        parser: 'vue-eslint-parser',
        parserOptions: {
          parser: {
            js: '@babel/eslint-parser',
            jsx: '@babel/eslint-parser',
            ts: '@typescript-eslint/parser',
            tsx: '@typescript-eslint/parser',
          },
        },
      });
    }
  }

  pkg.save();
};

task.description = 'Add alloy';
module.exports = task;
