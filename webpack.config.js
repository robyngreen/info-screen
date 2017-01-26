// webpack.config.js
// This simply tells webpack how to work.
'use strict';

var loaders = ['react-hot', 'babel-loader'];
/*if (process.env.NODE_ENV === 'development') {
  loaders = ['react-hot','babel'];
}*/
module.exports = {
  devtool: 'eval',
  entry: './app/app-client.js',
  output: {
    path: __dirname + '/docroot/scripts',
    filename: 'bundle.js',
    publicPath: '/docroot/scripts/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }]
  }
};
