/*eslint strict: ["error", "global"]*/
'use strict';

//=======================================================
// Include gulp
//=======================================================
var gulp = require('gulp');
var sass = require('gulp-sass');

// git rm -r --cached bower_components/


var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './docroot'
};

// Compile Sass
gulp.task('compile:sass', function() {
  return gulp.src('./css/app.scss')
    .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets']
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('default', ['compile:sass']);
