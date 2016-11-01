'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const CI = process.env.CI === 'true';

const OPTIONS = {
  reporter: CI ? 'xunit' : null,
  reporterOptions: {
    output: CI ? 'shippable/testresults/api-test-unit-result.xml' : null
  },
  require: ['./src/api-test/helpers']
};

gulp.task('api-test-unit', () => gulp
    .src(['src/api-test/**/*spec.js'], {read: false})
    .pipe(mocha(OPTIONS))
);
