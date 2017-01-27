'use strict';

import express from 'express'
var proxy = require('proxy-middleware');
import hogan from 'hogan-express'

var webpack = require('webpack');
var url = require('url');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var compiler = webpack(config);

// Set a title from the command line for referrals.
process.title = process.argv[2];

// -------- The Proxy ----------------------
const app = express();
app.engine('html', hogan);
// Proxy the request for static assets;
app.use('/scripts', proxy(url.parse('http://localhost:8081/scripts')));
app.use('/css', proxy(url.parse('http://localhost:8081/css')));
app.use('/fonts', proxy(url.parse('http://localhost:8081/fonts')));
app.use('/images', proxy(url.parse('http://localhost:8081/images')));
app.set('port', (process.env.PORT || 3000));
app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../docroot/index.html'));
});
app.listen(app.get('port'));

// ----- The webpack dev server ------------------
var server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/../docroot',
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

// Instantiate middleware so to avoid
// EventSource's response has a MIME type ("text/html") that is not "text/event-stream"
// https://github.com/glenjamin/webpack-hot-middleware/issues/26
server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
server.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

server.listen(8081, "localhost", function() {});

console.info('==> Server is listening');
console.info('==> Go to http://localhost:%s', app.get('port'));

console.info('==> WebpackDevServer is listening');
console.info('==> Go to http://localhost:8081');
