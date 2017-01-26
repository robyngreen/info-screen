// app-client.js
// @todo: What does this do?
// https://www.sitepoint.com/building-a-react-universal-blog-app-a-step-by-step-guide/
'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { browserHistory } from 'react-router'

// Routes
import routes from './routes'

const Routes = (
  <Router history={browserHistory}>
    { routes }
  </Router>
)

const app = document.getElementById('app')
render(Routes, app)
