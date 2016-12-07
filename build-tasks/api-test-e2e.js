'use strict';

const env = require('gulp-env');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

const CI = process.env.CI === 'true';
const envs = env.set({NODE_ENV: 'test'});

const OPTIONS = {
  reporter: CI ? 'xunit' : null,
  reporterOptions: {output: CI ? 'shippable/testresults/api-test-e2e-result.xml' : null},
  require: [
    './src/api-test-e2e/helpers',
    './src/api-test-e2e/database',
    './src/api-test-e2e/result-file'
  ],
  timeout: 30000
};

gulp.task('api-test-e2e', done => gulp
  .src(['src/api-test-e2e/**/*spec.js'], {read: false})
  .pipe(envs)
  .pipe(mocha(OPTIONS))
  .once('end', done)
);
