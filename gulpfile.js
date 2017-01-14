/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sync = require('browser-sync');

// Workflow:
// npm creates/uses package.json - this installs packages
// What does bower.json do then?

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

gulp.task('default', ['compile:sass']);
