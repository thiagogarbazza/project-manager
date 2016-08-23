'use strict';
const gulp = require('gulp');
const runSequence = require('run-sequence');

const tasks = require('require-dir')('./src/tasks');

gulp.task('build', cb => {
  return runSequence('build-clean', 'build-copy', ['build-css', 'build-js'], cb);
});
