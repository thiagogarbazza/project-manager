'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('build-clean', function() {
  return gulp
    .src('dist/')
    .pipe(clean());
});
