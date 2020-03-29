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
        test: /\.(png|gif|jpg)/,
        loader: 'file-loader',
        options: {
          // Workaround of getting url string instead of module object
          // https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
          esModule: false,
        },
      },
      // See https://github.com/webpack-contrib/sass-loader
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: false // optional
              },
            },
          },
        ],
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
