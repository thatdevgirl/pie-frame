// Gulp libraries
var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel  = require('gulp-babel'),
    watch  = require('gulp-watch');

// Array of JS files, in order by dependency.
var vendorFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/d3/build/d3.min.js',
  'node_modules/randomcolor/randomcolor.js'
];

var guVendorFiles = [
  'node_modules/d3/build/d3.min.js',
  'node_modules/randomcolor/randomcolor.js'
];

var jsFiles = [
  'js/src/pieFrame.js',
  'js/src/pfBarChart.js',
  'js/src/pfPieChart.js'
 ];

// Tasks to concatinate required vendor JS files.
gulp.task('vendor', function() {
  return gulp.src(vendorFiles)
    .pipe(concat('pieFrame-vendor.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('vendor-gu', function() {
  return gulp.src(guVendorFiles)
    .pipe(concat('pieFrame-vendor-gu.min.js'))
    .pipe(gulp.dest('js'));
});

// Task to concatinate and minify custom JS files.
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
gulp.task('default', ['vendor', 'vendor-gu', 'js', 'watch']);
