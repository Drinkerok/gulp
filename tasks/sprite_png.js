'use strict';

const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const $ = require('gulp-load-plugins')();
const buffer = require('vinyl-buffer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  return function() {
    let spriteData =  gulp.src(options.src)
      .pipe($.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite-png.less',
        cssFormat: 'less',
        algorithm: 'binary-tree',
        cssTemplate: options.template
      }));

    let imgStream = spriteData.img
      .pipe(buffer())
      .pipe($.if(!isDevelopment, $.imagemin()))
      .pipe(gulp.dest(options.dest));

    let cssStream = spriteData.css
    .pipe(gulp.dest(options.less));

    return combiner(imgStream, cssStream);
  };
};