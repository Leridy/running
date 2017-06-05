var gulp = require('gulp'),
	rev = require('gulp-rev'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref'),
	htmlmin = require('gulp-htmlmin'),
	replace = require('gulp-replace'),
	minifyCss = require('gulp-minify-css'),
	revReplace = require('gulp-rev-replace'),
	prefixUrl = require('gulp-prefix-url'),
	prefix = '//static1.runningdreamer.com';


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
		.pipe(gulpif('*.html', htmlmin({
			collapseWhitespace: true
		})))

    .pipe(gulpif('*.html', prefixUrl(prefix)))

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

gulp.task('scripts', ['amd'], () => {
	return gulp.src([
			'./src/static/js/**/*.js'
		])
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest('./release/static/js'))
		.pipe(rev.manifest())
		.pipe(replace(/\.js/g, ''))
		.pipe(gulp.dest('./src/static/js'));
});

gulp.task('images', function() {
	return gulp.src([
			'./src/static/images/**/*'
		])
		.pipe(gulp.dest('./release/static/images'));
});


gulp.task('default', ['html', 'base', 'fonts', 'images']);