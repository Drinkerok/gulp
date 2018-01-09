'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  return function() {
    return gulp.src(options.src)
      .pipe($.pug({
        pretty: true
      }))
      .pipe(gulp.dest(options.dest))
  };
};