// webpack.config.js
// This simply tells webpack how to work.
'use strict';

//import webpack from 'webpack';
//
var webpack = require('webpack');

var loaders = ['react-hot-loader', 'babel-loader'];
var path = require('path');
/*if (process.env.NODE_ENV === 'development') {
  loaders = ['react-hot','babel'];
}*/
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack-hot-middleware/client',
    './app/app-client.js'
  ],
  output: {
    path: path.resolve(__dirname, 'docroot/scripts'),
    filename: 'bundle.js',
    //publicPath: '/docroot/scripts/' // For prod.
    publicPath: 'http://localhost:8081/scripts'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
