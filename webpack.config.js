// webpack.config.js
// This simply tells webpack how to work.
'use strict';

var loaders = ['babel'];
/*if (process.env.NODE_ENV === 'development') {
  loaders = ['react-hot','babel'];
}*/
module.exports = {
  devtool: 'eval',
  entry: './app-client.js',
  output: {
    path: __dirname + '/docroot',
    filename: 'bundle.js',
    publicPath: '/docroot/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }]
  }
};
