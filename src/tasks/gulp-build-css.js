'use strict';
const gulp = require('gulp');
const stylus = require('gulp-stylus');

gulp.task('build-css', function() {
  return gulp.src('src/web/styles/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist/web/styles/'));
});
