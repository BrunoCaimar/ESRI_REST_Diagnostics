var gulp = require('gulp');
var minify = require('gulp-minify');
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
        .pipe(bookmarklet({format: 'htmlsingle', file: 'bookmarklets.html'}))
        .pipe(gulp.dest('.'));
});

gulp.task('clean-min', function () {
  return del([
    'dist',
	'min_js'
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

gulp.task('default', ['bookmarklet']);
