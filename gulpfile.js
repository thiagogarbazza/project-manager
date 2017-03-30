'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

require('require-dir')('./build-tasks');

gulp.task('verify', done => runSequence('coverage-before', 'api-test-unit', 'coverage-after', done));

gulp.task('make', done => runSequence('clean', 'build-css', done));
