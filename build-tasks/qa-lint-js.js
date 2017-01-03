'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const CI = process.env.CI === 'true';
const FORMAT = CI ? 'checkstyle' : 'stylish';

gulp.task('qa-lint-js', ['api-lint', 'api-test-unit-lint', 'api-test-e2e-lint', 'web-lint', 'others-js-lint']);

gulp.task('api-lint', () => gulp
  .src(['src/api/**/*.js'])
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format(FORMAT))
);

gulp.task('api-test-unit-lint', () => gulp
  .src(['src/api-test/**/*.js'])
  .pipe(eslint({configFile: 'src/api-test/.eslintrc.json'}))
  .pipe(eslint.format(FORMAT))
);

gulp.task('api-test-e2e-lint', () => gulp
  .src(['src/api-e2e/**/*.js'])
  .pipe(eslint({configFile: 'src/api-e2e/.eslintrc.json'}))
  .pipe(eslint.format(FORMAT))
);

gulp.task('web-lint', () => gulp
  .src(['src/web/**/*.js'])
  .pipe(eslint({configFile: 'src/web/.eslintrc.json'}))
  .pipe(eslint.format(FORMAT))
);

gulp.task('others-js-lint', () => gulp
  .src(['*.js', 'build-tasks/**/*.js'])
  .pipe(eslint({configFile: '.eslintrc.json'}))
  .pipe(eslint.format(FORMAT))
);
