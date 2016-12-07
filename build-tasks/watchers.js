'use strict';

const gulp = require('gulp');

gulp.task('w-styles', () => gulp.watch('src/web/styles/**/*.styl', ['web-build-style']));
gulp.task('w-api-unit', () => gulp.watch('src/api*/**/*.js', ['api-test-unit']));
gulp.task('w-api-e2e', () => gulp.watch('src/api*/**/*.js', ['api-test-e2e']));
