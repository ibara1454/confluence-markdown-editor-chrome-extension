const path = require('path');
const config = require('./config');
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  target: 'web',

  mode,

  entry: {
    index: './src/index.ts',
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
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'file-loader'
      }
    ],
  },

  plugins:[
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'app.css'
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

  // output: {
  //   filename: '[name].js',
  //   libraryTarget: 'global',
  //   globalObject: 'this',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  output: {
    path: path.resolve(__dirname, config.output),
  },

  // Workaround of passing CSP (Content Security Policy) when using mode: development
  // Stackoverflow: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed
  // https://stackoverflow.com/a/49100966
  devtool: 'cheap-module-source-map',
};
