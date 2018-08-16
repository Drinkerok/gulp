'use strict';
// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const isDevelopment = true;


const gulp = require('gulp');
const $ = require('gulp-load-plugins')();


function lazyRequireTask(taskName, path, options = {}) {
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}



// TASKS
// PUG
lazyRequireTask('pug', './tasks/pug.js', {
  src: 'frontend/pug/*.pug',
  dest: 'public'
});

// Компиляция less файла из главного styles.less
lazyRequireTask('less', './tasks/less.js', {
  src: 'frontend/less/*.less',
  dest: 'public/css',
  isDevelopment: isDevelopment
});

// Перенос всех файлов
lazyRequireTask('assets', './tasks/assets.js', {
  src: 'frontend/assets/**/*.*',
  dest: 'public'
});

// Перенос статичных картинок
lazyRequireTask('img:static', './tasks/assets.js', {
  src: 'frontend/img/**/*.*',
  dest: 'public/img/'
});

// Sprite SVG
lazyRequireTask('img:sprite-svg', './tasks/sprite_svg.js', {
  src: 'frontend/svg-sprite/*.svg',
  dest: 'public/svg',
});

// JS
lazyRequireTask('webpack', './tasks/webpack.js', {
  src: 'frontend/js/*.js',
  dest: 'public/js',
  isDevelopment: isDevelopment
});
lazyRequireTask('lint', './tasks/lint.js', {
  src: 'frontend/js/**/*.js'
});




// WORK tasks
lazyRequireTask('clean', './tasks/clean.js', {});

gulp.task('build', gulp.series(
  'clean',
  'img:sprite-svg',
  gulp.parallel('pug', 'less', 'assets', 'img:static', 'webpack'))
);

lazyRequireTask('server', './tasks/server.js', {
  src: 'public',
  watch: 'public/**/*.*'
});




// WATCH
gulp.task('watch', function() {
  gulp.watch('frontend/pug/**/*.pug', gulp.series('pug'));
  gulp.watch(['frontend/less/**/*.less', 'tmp/**/*.less'], gulp.series('less'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
  gulp.watch('frontend/img/**/*.*', gulp.series('img:static'));
  gulp.watch('frontend/svg-sprite/*.svg', gulp.series('img:sprite-svg'));
})



// DEVELOPMENT
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));