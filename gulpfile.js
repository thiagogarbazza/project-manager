'use strict';
const gulp = require('gulp');
const runSequence = require('run-sequence');
const tasks = require('require-dir')('./build-tasks');

// const eslint = require('gulp-eslint');
// const htmlhint = require('gulp-htmlhint');

// gulp.task('eslint', () => gulp.src(['**/*.js', '!node_modules/**', '!web/libs/**'])
//   .pipe(eslint())
//   .pipe(eslint.format())
//   .pipe(eslint.failAfterError())
// );
//
// gulp.task('htmlhint', () => gulp.src(['**/*.html', '!node_modules/**', '!web/libs/**'])
//   .pipe(htmlhint())
//   .pipe(htmlhint.reporter('htmlhint-stylish'))
//   .pipe(htmlhint.failReporter({ suppress: true }))
// );
//
// gulp.task('qa', ['eslint', 'htmlhint']);

gulp.task('verify', cb => runSequence('coverage-before', 'api-test-unit', 'coverage-after', cb));

gulp.task('make', cb => runSequence('clean', 'build-css', cb));
