'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const svgSprite = require("gulp-svg-sprites");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
  return function() {
    return gulp.src(options.src)
      .pipe($.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.cheerio({
        run: function ($) {
          $('[fill]').attr('fill', 'currentColor');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: "symbols",
        preview: false,
        svg: {
          sprite: "sprite.svg",
          symbols: "sprite.svg"
        }
      }))
      .pipe(gulp.dest(options.dest));
  };
};