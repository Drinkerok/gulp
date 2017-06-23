'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return gulp.src(options.src, {since: gulp.lastRun('assets')})
      .pipe($.newer(options.dest))
      .pipe(gulp.dest(options.dest))
  }
};