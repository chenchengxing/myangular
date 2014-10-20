var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('default', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js', '*.js'], ['hint', 'mocha']);
});

gulp.task('mocha', function () {
  return gulp.src('test/*.js')
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

/**
 * hint for all src javascript
 */
gulp.task('hint', function () {
  return gulp.src(['src/**/*.js', 'test/**/*.js', '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

