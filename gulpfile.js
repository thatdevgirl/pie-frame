const gulp = require('gulp'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      concat = require('gulp-concat'),
      source = require('vinyl-source-stream'),
      streamify = require('gulp-streamify'),
      uglify = require('gulp-uglify'),
      watch = require('gulp-watch');

// Array of JS files, in order by dependency.
const vendorFiles = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/d3/build/d3.min.js',
  'node_modules/randomcolor/randomcolor.js'
];

// Tasks to concatinate required vendor JS files.
gulp.task('vendor', function() {
  return gulp.src(vendorFiles)
    .pipe(concat('pieFrame-vendor.min.js'))
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('js', () => {
	browserify({
    	entries: './assets/_js/pieFrame.js',
    	debug: true
  	})
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('pieFrame.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./assets/js'));
});

// Watcher task for JS files.
gulp.task('watch', function() {
  gulp.watch('js/*/*.js', ['js']);
});

// Default task
gulp.task('default', ['vendor', 'js', 'watch']);
