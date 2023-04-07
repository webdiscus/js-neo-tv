const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/pages/home/app.js'),
    search: path.resolve(__dirname, './src/pages/search/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/js-neo-tv/',
    filename: '[name].js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'docs'),
    },
    hot: true,
    open: true,
    port: 8800,
    compress: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack app',
      template: 'src/pages/home/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'webpack app',
      template: 'src/pages/search/search.html',
      filename: 'search.html',
      inject: 'body',
      chunks: ['search'],
    }),
    new Dotenv(),
  ],
};
