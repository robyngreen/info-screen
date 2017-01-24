// routes.js
// Basic routes scaffolding.
// https://www.sitepoint.com/building-a-react-universal-blog-app-a-step-by-step-guide/
'use strict';

import React, { Component } from 'react'
import { Route, IndexRoute, Link } from 'react-router'

// Main component
class App extends Component {
  componentDidMount(){
    document.body.className=''
  }
  render(){
    return (
      <div>This is global test</div>
    )
  }
}

// Pages
class Home extends Component {
  render(){
    return (
      <div>
        <h2>Home</h2>
        <div>Some home page content</div>
      </div>
    )
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
)
