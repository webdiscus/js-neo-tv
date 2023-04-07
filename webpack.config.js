const webpack = require('webpack');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/js-neo-tv/',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['css-loader'] },
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'docs'),
    },
    watchFiles: {
      paths: ['src/**/*.*'], // watch changes in paths
      options: {
        usePolling: true,
      },
    },
    hot: true,
    open: '/js-neo-tv/', // open page in public path
    port: 8800,
    compress: true,
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: 'src/pages/home/index.html', // => docs/js-neo-tv/index.html
        search: 'src/pages/search/search.html', // => docs/js-neo-tv/search.html
      },
      js: {
        // output filename of extracted JS
        filename: '[name].[contenthash:8].js',
      },
      css: {
        // use filename to extract CSS in separate output file
        //filename: '[name].[contenthash:8].css',
        // OR you can inline all CSS into HTML
        inline: true,
      }
    }),
    new Dotenv(),
  ],
};
