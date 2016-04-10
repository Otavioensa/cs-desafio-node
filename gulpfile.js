
  var gulp = require('gulp');
  var jshint = require('gulp-jshint');
  var uglify = require('gulp-uglify');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var files = ['./*.js', 'controller/*.js', 'db/*.js', 
    'model/*.js', 'route/*.js', 'validation/*.js'];

  gulp.task('lint', function () {

    gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  });

  gulp.task('dist', function() {

    gulp.src(files)
    .pipe(concat('./dist'))
    .pipe(rename('dist.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));

  });

  gulp.task('default', function() {

    gulp.run('lint', 'dist');

    gulp.watch(files, function() {
      gulp.run('lint', 'dist');
    });

  });