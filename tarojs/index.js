const { install, packageJson, uninstall } = require('mrm-core');

const task = async () => {
  packageJson()
    .unset('templateInfo')
    .unset('author')
    .unset('description')
    .removeScript(/^build:/)
    .removeScript(/^dev:/)
    .appendScript('build', 'rimraf dist && taro build --type weapp')
    .appendScript('dev', 'taro build --type weapp --watch')
    .merge({
      eslintConfig: {
        extends: ['taro', 'taro/react', 'alloy', 'alloy/react', 'alloy/typescript'],
        rules: {
          'jsx-quotes': ['error', 'prefer-double'],
        },
        globals: {
          JSX: true,
          __wxConfig: true,
          definePageConfig: true,
          defineAppConfig: true,
        },
      },
    })
    .save();

  uninstall(
    [
      '@tarojs/helper',
      '@tarojs/plugin-framework-react',
      '@tarojs/plugin-platform-alipay',
      '@tarojs/plugin-platform-jd',
      '@tarojs/plugin-platform-qq',
      '@tarojs/plugin-platform-swan',
      '@tarojs/plugin-platform-tt',
      '@tarojs/plugin-platform-weapp',
      '@tarojs/router',
      '@tarojs/shared',
      '@tarojs/taro-h5',
      'react-query',
    ],
    { dev: false },
  );

  uninstall([
    '@tarojs/mini-runner',
    '@tarojs/webpack-runner',
    'thread-loader',
    'cache-loader',
    'taro-plugin-compiler-optimization',
    'terser-webpack-plugin',
  ]);

  install(
    [
      '@prequest/interceptor',
      '@prequest/miniprogram',
      'classnames',
      'dayjs',
      'jotai',
      'use-debounce',
      'lodash',
      'class-transformer',
      'reflect-metadata',
      '@tanstack/react-query',
    ],
    { dev: false },
  );

  install(['@types/lodash', '@prequest/types', '@types/node', '@tarojs/webpack5-runner']);
};

module.exports.description = 'Config tarojs project';
module.exports = task;
