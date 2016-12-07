'use strict';

const clean = require('gulp-clean');
const gulp = require('gulp');

gulp.task('clean', () => gulp
  .src('dist/')
  .pipe(clean())
);
