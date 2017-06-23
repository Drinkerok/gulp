'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  return function() {
    return gulp.src(options.src)
      .pipe($.babel({
        presets: ['es2015', 'stage-0']
      }))
      .pipe($.if(!isDevelopment, $.uglify({
      })))
      .pipe(gulp.dest(options.dest));
  }
};