const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader', // 1. Turns css into commonJS
        ]
      },
    ],
  },
  // Workaround of passing CSP (Content Security Policy) when using mode: development
  // Stackoverflow: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed
  // https://stackoverflow.com/a/49100966
  devtool: 'cheap-module-source-map',
});
