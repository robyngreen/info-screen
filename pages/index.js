'use strict';

import Weather from '../components/Weather';
import Time from '../components/Time';
import Calendar from "../components/Calendar";
import Maps from '../components/Maps';
import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <title>SchoolFinder</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <script src="/static/js/skycons.js"></script>
    <style jsx global>{`
      html {
        font-family: 'Gotham SSm A', 'Gotham SSm B', 'Gotham', Sans-Serif;
        box-sizing: border-box;
        line-height: 1.15;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        font-size: 100%;
      }

      * {
        box-sizing: inherit;
      }

      *::before,
      *::after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.785;
        letter-spacing: -0.04rem;
        color: #000;
      }

      @font-face {
        font-family: 'SST';
        src: url("/static/fonts/SST/Regular.ttf") format("truetype"); }

      @font-face {
        font-family: 'SST-light';
        src: url("/static/fonts/SST/Regular.ttf") format("truetype"); }

      @font-face {
        font-family: 'SST-condensed';
        src: url("/static/fonts/SST/Condensed.ttf") format("truetype"); }

      body {
        margin: 1em 3em; }

      html {
        position: absolute;
        z-index: 1;
        height: 100%;
        width: 100%;
        overflow: hidden; }
        html:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          /*background: #fff url(/static/images/background/italy.jpg) center center fixed no-repeat;*/
          background: #fff url(/static/images/background/milky-way-mountains.jpg) center center fixed no-repeat;
          background-size: cover;
          filter: blur(7px);
          transform: scale(1.1); }

        .info-container {
          display: flex; }

        .left {
          width: 66%; }

        .right {
          margin-left: auto; }

        .page {
          background-color: #fff; }

    `}</style>
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
  </div>
);
