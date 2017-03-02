'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');

gulp.task('web-build-style', () => gulp
  .src(['src/web/styles/main.styl'])
  .pipe(stylus())
  .pipe(gulp.dest('dist/web/styles/'))
);
