'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './weather';
import Time from './time';
import Maps from './maps';
import Calendar from './calendar';

const app = document.getElementById('app');

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
