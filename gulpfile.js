'use strict';

global.$ = {
  package:     require('./package.json'),
  config:      require('./gulp/config'),
  path:        {
    task:          require('./gulp/paths/tasks.js'),
    jsFoundation:  require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app:           require('./gulp/paths/app.js')
  },
  gulp:        require('gulp'),
  sourcemaps : require('gulp-sourcemaps'),
  concatCss :require('gulp-concat-css'),
  csso : require('gulp-csso'),
  rimraf:      require('rimraf'),
  browserSync: require('browser-sync'),//.create(),
  gp:          require('gulp-load-plugins')({
    rename: {
      'gulp-svg-sprite': 'svgSprite',
      'gulp-sass-glob':  'sassGlob'
    }
  })
};

$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});
$.gulp.task('fa', function() {
  return $.gulp.src($.config.bowerDir + '/font-awesome/fonts/**.*')
      .pipe($.gulp.dest($.config.root + '/assets/fonts'));
});
$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'js:foundation',
        'js:process',
        'copy:image',
        'copy:fonts',
        'fa',
        'copy:json',
        'copy:php',
        'css:foundation',
        'svgSprite'

    ),
    $.gulp.parallel(
        'watch',
        'serve'
       // 'unCss'
    )
));
