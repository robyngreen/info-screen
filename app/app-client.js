'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './weather';
import Time from './time';
import Maps from './maps';
import Calendar from './calendar';

const app = document.getElementById('app');

// @todo: How to set global time refresh.
// @todo: Set global gapi key.
// @todo: Set refresh only for prod environment.
// @todo: Set JSON data differently for prod vs dev.

let modals = (
  <div className='info-container'>
    <div className='left'>
      <Weather />
      <Maps />
    </div>
    <div className='right'>
      <Time />
      <Calendar />
    </div>
  </div>
);

ReactDOM.render(modals, app);
