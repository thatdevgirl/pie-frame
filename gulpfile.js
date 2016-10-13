// Gulp libraries
var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel  = require('gulp-babel'),
    watch  = require('gulp-watch');

// Array of JS files, in order by dependency.
var jsFiles = [
  'js/src/pfBarChart.js',
  'js/src/pieFrame.js'
 ];

// Task to concatinate and minify JS files.
gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('pieFrame.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// Watcher task for JS files.
gulp.task('watch', function() {
  gulp.watch('js/*/*.js', ['js']);
});

// Default task
gulp.task('default', ['watch']);
