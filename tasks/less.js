'use strict';

const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
      $.if(options.isDevelopment, $.sourcemaps.init()),
      $.less({
        paths: process.cwd(),
      }),
      $.if(options.isDevelopment, $.sourcemaps.write()),
      $.if(!options.isDevelopment, combiner($.autoprefixer(), $.csso())),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
  };
};