// app-client.js
// @todo: What does this do?
// https://www.sitepoint.com/building-a-react-universal-blog-app-a-step-by-step-guide/
'use strict';

import React from "react";
import ReactDOM from 'react-dom';
import Weather from "./weather";

const app = document.getElementById('app');

ReactDOM.render(
  <Weather />,
  app
);
