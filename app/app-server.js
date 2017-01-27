// app-server.js
// Same as server.js?

'use strict';

import express from 'express'
var proxy = require('proxy-middleware');
import hogan from 'hogan-express'

var webpack = require('webpack');
var url = require('url');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

// Set a title from the command line for referrals
process.title = process.argv[2];

/*
app.get('*',(req, res) => {

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    const reactMarkup = ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps}/>)

    res.locals.reactMarkup = reactMarkup

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      // Success!
      res.status(200).render('index.html')

    } else {
      res.status(404).render('index.html')
    }
  })
})
*/

// -------- The Proxy ----------------------
const app = express();
app.engine('html', hogan)
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
var server = new WebpackDevServer(webpack(config), {
  contentBase: __dirname + '/../docroot',
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

server.listen(8081, "localhost", function() {});

console.info('==> Server is listening');
console.info('==> Go to http://localhost:%s', app.get('port'));

console.info('==> WebpackDevServer is listening');
console.info('==> Go to http://localhost:8081');
