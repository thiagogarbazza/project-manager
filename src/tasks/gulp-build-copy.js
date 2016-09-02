'use strict';
const gulp = require('gulp');

gulp.task('build-copy', () => {
  return gulp.src(['src/web/**', '!src/web/**/*.styl'])
    .pipe(gulp.dest('dist/web'));
});
