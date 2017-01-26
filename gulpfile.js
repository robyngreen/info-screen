/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sync = require('browser-sync');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var order = require('gulp-order');
var del = require('del');

// npm run
// https://www.sitepoint.com/building-a-react-universal-blog-app-a-step-by-step-guide/
// gulp to rpocess css
//  need to watch bundle.js, but is only web packed watched in docroot changes (files sites oneup)
//
// npm install nodemon -g
//
// npm i -g npm-check-updates
// npm-check-updates -u
// npm install
//
// http://stackoverflow.com/questions/23258421/how-to-stop-app-that-node-js-express-npm-start
// I'd be using pm2 or something the automatically handled this on the basis of a git push.
//
//
// pluto sans extra light
// Forecast: http://api.wunderground.com/api/13d3adca9dd11d63/forecast/q/AR/Conway.json
// Hourly: http://api.wunderground.com/api/13d3adca9dd11d63/hourly/q/AR/Conway.json

// Workflow:
// npm creates/uses package.json - this installs packages
// What does bower.json do then?
// ps aux|grep node
// sudo kill -9 88311

// http://treyhunner.com/2015/02/creating-a-custom-bootstrap-build/
//
// To use on project:
// gulp
//
// To update package:
// npm i -g npm-check-updates
// npm-check-updates -u
// npm install

// git rm -r --cached bower_components/
// http://getbootstrap.com/getting-started/
// http://treyhunner.com/2015/02/creating-a-custom-bootstrap-build/
// https://darksky.net/dev/docs/forecast
//
// Google calendar
// Google traffic map
// Weather
// Budget amount


var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './docroot'
};

// Compile Sass
gulp.task('compile:sass', function() {
  return gulp.src('./sass/{global,components}/**/*.scss')
    .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets']
    }))
    .pipe(rename(function (path) {
      path.dirname = '';
      return path;
    }))
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(sync.stream({match: '**/*.css'}));
});

//=======================================================
// Concat all CSS files into a master bundle.
//=======================================================
gulp.task('concat', function () {
  return gulp.src([
    './docroot/css/*.css'
  ])
  // Reorder the files so global and btn are first.
  .pipe(order([
    'docroot/css/app.css',
    'docroot/css/*.css'
  ], { base: './' }))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('./docroot/css'))
  .pipe(sync.stream());
});

// Clean style guide files.
gulp.task('clean', function () {
  return del([
    './docroot/css/*'
  ], {force: true});
});

//gulp.task('default', ['compile:sass']);

gulp.task('default', function(callback) {
  runSequence(
    'clean',
    ['compile:sass'],
    'concat',
    callback
  );
});
