'use strict';

import React from "react";
import ReactDOM from 'react-dom';
import Weather from "./weather";
import Time from "./time";
import Maps from "./maps";

const app = document.getElementById('app');

let modals = (
  <div>
    <Weather />
    <Time />
    <Maps />
  </div>
);

ReactDOM.render(modals, app);
