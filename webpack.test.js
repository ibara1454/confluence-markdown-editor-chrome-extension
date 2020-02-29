const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.config');

// Override the config of vue-loader
// The default value of this option is `true` when `target: node`,
// and will cause errors like
// ```
// [Vue warn]: Property or method "_ssrNode" is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option.
// ```
// The workaround is setting `optimizeSSR` to false.
// https://github.com/vuejs/vue-loader/issues/885#issuecomment-375802186
// https://vue-loader-v14.vuejs.org/ja/options.html#optimizessr
config.module.rules[0].options.optimizeSSR = false;

module.exports = {
  ...config,

  mode: 'development',

  // In order to use JSDOM for testing dom's modifications,
  // `target` should be set to `node`.
  target: 'node',

  // Using mocha-webpack with jsdom
  // https://github.com/zinserjan/mocha-webpack/blob/e2aeeb0dc460f09b77808dcc45b595aa54a3fdcd/docs/guides/jsdom.md
  externals: [
    nodeExternals(), // in order to ignore all modules in node_modules folder from bundling
    // { jsdom: 'jsdom' },
  ],
};
