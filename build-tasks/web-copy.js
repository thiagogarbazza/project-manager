'use strict';

const gulp = require('gulp');

gulp.task('web-copy', () => gulp
  .src(['src/web/**', '!src/web/**/*.styl'])
  .pipe(gulp.dest('dist/web'))
);
