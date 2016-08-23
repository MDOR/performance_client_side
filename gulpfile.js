var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    browserify  = require('gulp-browserify'),
    rename      = require('gulp-rename'),
    livereload  = require('gulp-livereload');

gulp.task('sass', function () {
  return gulp.src('./SCSS/*.scss')
             .pipe(sass({
                          errLogToConsole: true
                        }))
             .pipe(gulp.dest('./app/'));
});

gulp.task('concat-css', ['sass'], function () {
  return gulp.src([ './node_modules/reveal/index.css',
                    './app/main.css'])
             .pipe(concat('site.css'))
             .pipe(gulp.dest('./app/'))
             .pipe(livereload());
});

gulp.task('browserify', function () {
  return gulp.src(['./JS/main.js'])
              .pipe(browserify({
                insertGlobals : true
              }))
             .pipe(rename('site.js'))
             .pipe(gulp.dest('./app/'))
             .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src('./*.html')
             .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();

  gulp.watch('./SCSS/*.scss', ['sass', 'concat-css']);
  gulp.watch('./JS/*.js', ['browserify']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['watch']);
