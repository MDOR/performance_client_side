var gulp        = require('gulp'),
    babelify    = require('babelify'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    browserify  = require('gulp-browserify'),
    rename      = require('gulp-rename'),
    livereload  = require('gulp-livereload'),
    uncss       = require('gulp-uncss');;

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

/*Example 2*/

gulp.task('example2_concat', function () {
  return gulp.src([ './maquinas_label_example/example_2/bootstrap.css',
                    './maquinas_label_example/example_2/maquinas.css'])
             .pipe(concat('site.css'))
             .pipe(gulp.dest('./maquinas_label_example/example_2/'));
});

/*Example 3 UNCSS*/
gulp.task('uncss', function () {
    return gulp.src('./maquinas_label_example/example_3/site.css')
        .pipe(uncss({
            html: ['index.html'],
            timeout: 2000,
            ignore: [/maquinas-header/, /maquinas-header\:after/, /responsive-img/, /img-container/,
                     /navbar-menu */, /maquinas-label-form */,/header-form */,
                     /input/, /nav-bar/, /carousel/, /slide/, /carousel-indicators/,
                     /carousel-inner/, /carousel-indicators/, /carousel-control/,
                     /album-content-container/, /maquinas-header-content/,/glyphicon/, /glyphicon-chevron-right/,
                     /glyphicon-chevron-left/, /s-4/, /s-5/, /s-3-off/, /s-6/, /s-12/, /m-2/, /m-3/, /m-0-off/, /l-1/, /m-6/, /m-3-off/, /l-2/,
                     /ribbon/, /maquinas-footer/, /l-7/, /l-4/, /button/, /media-link/,
                     /maquinas-container/, /title/, /col/, /text-center/, /banner/, /background-footer/, /footer-content/]
        }))
        .pipe(gulp.dest('./maquinas_label_example/example_3/cleaned'));
});

gulp.task('default', ['watch']);
