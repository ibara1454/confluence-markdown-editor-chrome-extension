const path = require('path');
const config = require('./config');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',

  entry: {
    index: './src/index.ts',
    plugin: './src/plugin.ts',
    background: './src/background.ts',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
    ],
  },

  plugins:[
    new VueLoaderPlugin(),
    new CopyPlugin([{ from: 'public' }]),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      chunks: ['index'],
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.html'],
    alias: {
      // Provide configuration file
      'config$': path.resolve(__dirname, 'config.js'),
      '@': path.resolve(__dirname, 'src'),
      // Use runtime template compiler
      'vue$': 'vue/dist/vue.esm.js',
    },
  },

  output: {
    path: path.resolve(__dirname, config.output),
  },
};
