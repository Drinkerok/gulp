'use strict';
const gulp = require('gulp');



function lazyRequireTask(taskName, path, options = {}) {
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}



// TASKS
// HTML
lazyRequireTask('html', './tasks/html.js', {
  src: 'frontend/html/*.html',
  dest: 'public'
});
// Компиляция less файла из главного styles.less
lazyRequireTask('less', './tasks/less.js', {
  src: 'frontend/less/styles.less',
  dest: 'public/css'
});

// Перенос всех файлов
lazyRequireTask('assets', './tasks/assets.js', {
  src: 'frontend/assets/**/*.*',
  dest: 'public'
});

// Sprite PNG
lazyRequireTask('img:sprite-png', './tasks/sprite_png.js', {
  src: 'frontend/img/icons/*.{png, jpg, gif}',
  dest: 'public/img',
  template: 'templates/less.template.mustache',
  less: 'tmp/'
});

// JS
lazyRequireTask('js', './tasks/js.js', {
  src: 'frontend/js/**/*.js',
  dest: 'public/js'
});
lazyRequireTask('lint', './tasks/lint.js', {
  src: 'frontend/js/**/*.js'
});






// WORK tasks
lazyRequireTask('clean', './tasks/clean.js', {});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('html', 'img:sprite-png', 'less', 'assets', 'js'))
);

lazyRequireTask('server', './tasks/server.js', {
  src: 'public',
  watch: 'public/**/*.*'
});




// WATCH
gulp.task('watch', function() {
  gulp.watch('frontend/html/**/*.html', gulp.series('html'));
  gulp.watch(['frontend/less/**/*.less', 'tmp/**/*.less'], gulp.series('less'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
  gulp.watch('frontend/img/icons/*.{png, jpg, gif}', gulp.series('img:sprite-png'));
  gulp.watch('frontend/js/**/*.js', gulp.series('js'));
})



// DEVELOPMENT
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));