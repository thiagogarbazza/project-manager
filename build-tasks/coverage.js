'use strict';

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');

const CI = process.env.CI === 'true';
const OPTIONS_ISTANBUL = {
  dir: './shippable/codecoverage/',
  reportOpts: {cobertura: {dir: './shippable/codecoverage/', file: 'api-test-unit-cobertura.xml'}},
  reporters: CI ? ['cobertura'] : ['text']
};

gulp.task('coverage-before', () => gulp
  .src(['src/api/**/*.js'])
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
);

gulp.task('coverage-after', () => gulp
  .src(['src/api-test/**/*spec.js'], {read: false})
  .pipe(istanbul.writeReports(OPTIONS_ISTANBUL))
);
