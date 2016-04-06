var gulp = require('gulp');
var del = require('del');
var bookmarklet = require('gulp-bookmarklet');
 
gulp.task('bookmarklet', ['clean-min'], function() {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'js'}))
        .pipe(gulp.dest('.'));
});

gulp.task('bookmarklet-html', ['clean-min'], function() {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('bookmarklet-htmlsingle', ['clean-min'], function() {
    return gulp.src(['**/*.js', '!./**/*.min.js', '!gulpfile.js', '!node_modules/**/*.*'])
        .pipe(bookmarklet({format: 'htmlsingle', file: 'bookmarklets_raw.html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('clean-min', function () {
  return del([
    'dist',
	'min_js'
  ]);
});

gulp.task('default', ['bookmarklet', 'bookmarklet-html', 'bookmarklet-htmlsingle']);
