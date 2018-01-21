'use strict';

const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'prod';
const app = next({ dev });
const handle = app.getRequestHandler();
const normalizePort = require('./lib/normalize-port');

// Setup some port stuff.
process.title = process.argv[2];
const port = normalizePort(process.env.PORT || 3000);

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log('> Ready new on localhost:' + port);
    });
  });
