'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function(options) {
  return function() {
    browserSync.init({
      server: options.src
    });

    browserSync.watch(options.watch).on('change', browserSync.reload);
  }
};