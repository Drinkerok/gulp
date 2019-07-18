'use strict';
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const named = require('vinyl-named');
const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

let firstBuildReady = false;

function done(err, stats) {
  firstBuildReady = true;

  if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
    return;  // emit('error', err) in webpack-stream
  }
}




module.exports = function(options) {
  let webpackOptions = {
    output: {
      publicPath: '/js/',
      filename: '[name].js',
    },
    watch: options.isDevelopment,
    devtool: false,
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, "frontend"),
      }]
    },
    // plugins: [
    //   new webpack.NoEmitOnErrorsPlugin()
    // ]
  };

  return function(callback) {
    return gulp.src(options.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError(err => ({
          title: 'Webpack',
          message: err.message
        }))
      }))
      .pipe(named())
      .pipe(webpackStream(webpackOptions, null, done))
      // .pipe($.if(!options.isDevelopment, $.babel({
      //   presets: ['es2015', 'stage-0']
      // })))
      // .pipe($.if(!options.isDevelopment, $.uglify({})))
      .pipe(gulp.dest(options.dest))
      .on('data', function() {
        if (firstBuildReady) {
          callback();
        }
      });
  };
};
