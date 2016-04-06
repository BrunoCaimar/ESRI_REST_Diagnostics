var gulp = require('gulp');
var minify = require('gulp-minify');
var del = require('del');
var bookmarklet = require('gulp-bookmarklet');
 
gulp.task('bookmarklet', function() {
    return gulp.src(['src/**/*.js', '!gulpfile.js'])
        .pipe(bookmarklet({format: 'js', file: 'awesome.html'}))
        .pipe(gulp.dest('min.js'));
});

gulp.task('clean-min', function () {
  return del([
    'dist',
    '**/*.min.js'
  ]);
});

gulp.task('compress', ['clean-min'], function() {
  gulp.src('**/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['dist', '.'],
		noSource: [],
        ignoreFiles: ['*.min.js', '.\gulpfile.js']
    }))
    .pipe(gulp.dest('.'))
});

gulp.task('default', ['compress']);
