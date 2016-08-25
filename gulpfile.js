var gulp        = require('gulp'),
    babelify    = require('babelify'),
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

/*Example 1*/
gulp.task('example1_JS', function() {
    // Single entry point to browserify
    gulp.src('maquinas_label_example/maquinas_base/app/maquinas.js')
        .pipe(
          browserify({
            insertGlobals : true,
          })
          .transform("babelify", {presets: ["es2015", "react"]})
        )
        .pipe(gulp.dest('maquinas_label_example/example_1'))
});


gulp.task('default', ['watch']);
