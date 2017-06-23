'use strict';

const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const $ = require('gulp-load-plugins')();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
      $.if(isDevelopment, $.sourcemaps.init()),
      $.less({
        paths: process.cwd(),
      }),
      $.if(isDevelopment, $.sourcemaps.write()),
      $.if(!isDevelopment, combiner($.autoprefixer(), $.csso())),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
  };
};