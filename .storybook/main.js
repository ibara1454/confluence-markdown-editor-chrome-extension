const webpackConfig = require('../webpack.dev.js');

// Storybook 5.3 new configuration.
// https://medium.com/storybookjs/storybook-5-3-83e114e8797c
module.exports = {
  stories: ['../stories/**/*.stories.js'],

  addons: ['@storybook/addon-actions', '@storybook/addon-links'],

  // Override default storybook's webpack settings by project's
  // See https://storybook.js.org/docs/configurations/custom-webpack-config/#using-your-existing-config
  webpackFinal: (config) => {
    return {
      ...config,
      module: { ...config.module, rules: webpackConfig.module.rules },
      resolve: webpackConfig.resolve,
    };
  },
};
