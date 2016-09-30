var gulp = require('gulp'),
	rev = require('gulp-rev'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref'),
	htmlmin = require('gulp-htmlmin'),
	replace = require('gulp-replace'),
	minifyCss = require('gulp-minify-css'),
	revReplace = require('gulp-rev-replace');


gulp.task('html', function() {
	return gulp.src([
			'./src/*.html',
			'./src/**/*.html',
			'!./src/static/**/*',
		])

		// .pipe(gulpif('*.html', replace('config.development', 'config.production')))

		.pipe(useref())

		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))

		.pipe(gulpif('*.js', rev()))
		.pipe(gulpif('*.css', rev()))

		.pipe(revReplace({
			replaceInExtensions: ['.js', '.css', '.html']
		}))
		.pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))

		.pipe(gulp.dest('./release'));
});

gulp.task('base', function() {
	return gulp.src([
			'./src/favicon.ico'
		])
		.pipe(gulp.dest('./release'));
});

gulp.task('fonts', function() {
	return gulp.src([
			'./src/static/bower_components/bootstrap/fonts/*',
			'./src/static/bower_components/font-awesome/fonts/*'
		])
		.pipe(gulp.dest('./release/static/fonts'));
});

gulp.task('images', function() {
	return gulp.src([
			'./src/static/images/**/*'
		])
		.pipe(gulp.dest('./release/static/images'));
});

gulp.task('default', ['html', 'base', 'fonts', 'images']);