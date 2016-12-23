'use strict';

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const CI = process.env.CI === 'true';
const OPTIONS_MOCHA = {
  reporter: CI ? 'xunit' : null,
  reporterOptions: {output: CI ? 'shippable/testresults/api-test-unit-result.xml' : null},
  require: ['./src/api-test/helpers']
};
const OPTIONS_ISTANBUL = {
  dir: './shippable/codecoverage/',
  reportOpts: {cobertura: {dir: './shippable/codecoverage/', file: 'api-test-unit-cobertura.xml'}},
  reporters: ['cobertura']

};

gulp.task('api-test-unit-istanbul', () => gulp
  .src(['src/api/**/*.js'])
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
);

gulp.task('api-test-unit', ['api-test-unit-istanbul'], () => gulp
  .src(['src/api-test/**/*spec.js'], {read: false})
  .pipe(mocha(OPTIONS_MOCHA))
  .pipe(istanbul.writeReports(OPTIONS_ISTANBUL))

);
