const { json, install } = require('mrm-core');

const task = () => {
  json('tsconfig.json')
    .merge({
      compilerOptions: {
        target: 'es6',
        module: 'commonjs',
        moduleResolution: 'node',
        strict: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        noUnusedLocals: true,
        pretty: true,
        lib: ['esnext'],
      },
    })
    .save();

  json('.vscode/settings.json')
    .merge({
      'typescript.tsdk': './node_modules/typescript/lib',
    })
    .save();

  install(['typescript', '@types/node']);
};

module.exports.description = 'Add TypeScript';
module.exports = task;
