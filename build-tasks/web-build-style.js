'use strict';
const gulp = require('gulp');
const stylus = require('gulp-stylus');

gulp.task('web-build-style', function() {
  return gulp.src(['src/web/styles/main.styl', 'src/web/styles/template.styl'])
    .pipe(stylus())
    .pipe(gulp.dest('dist/web/styles/'));
});
