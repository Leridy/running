const gulp = require('gulp');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const revReplace = require('gulp-rev-replace');
const fileinclude = require('gulp-file-include');

const amdPaths = [
	'src/static/jsx/**/*.js',
	'!src/static/jsx/system.js',
	'!src/static/jsx/responsive.js',
	'!src/static/jsx/babel-helpers.js',
	'!src/static/jsx/config.production.js',
	'!src/static/jsx/config.development.js'
];


gulp.task('html', ['sass', 'core', 'scripts'], () => {
	return gulp.src([
		'./src/*.html'
	])

	.pipe(gulpif('*.html', replace('config.development', 'config.production')))

	.pipe(
			gulpif(
				'index.html',
				replace('{/*include manifest*/}', '@@include("./static/js/rev-manifest.json")')
			)
		)
		.pipe(fileinclude())

	.pipe(useref())

	.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))

	.pipe(gulpif('*.js', rev()))
		.pipe(gulpif('*.css', rev()))

	.pipe(
			revReplace({
				replaceInExtensions: ['.js', '.css', '.html']
			})
		)
		.pipe(
			gulpif(
				'*.html',
				htmlmin({
					minifyJS: true,
					minifyCSS: true,
					removeComments: true,
					collapseWhitespace: true,
					removeEmptyAttributes: true
				})
			)
		)

	.pipe(gulp.dest('./release'));
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

gulp.task('core', () => {
	return gulp.src([
			'./src/static/jsx/*.js',
			'!./src/static/jsx/app.js',
			'!./src/static/jsx/babel-helpers.js'
		])
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['es2015'],
				plugins: [
					'external-helpers'
				]
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./src/static/js'));
});

gulp.task('amd', () => {
	return gulp.src(amdPaths)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['es2015'],
				plugins: [
					'external-helpers',
					'transform-es2015-modules-amd'
				]
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./src/static/js'));
});

gulp.task('sass', () => {
	return gulp.src([
			'./src/static/scss/**/*.scss'
		])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./src/static/css'));
});

gulp.task('resource', () => {
	return gulp.src([
			'./src/favicon.ico',
			'./src/web.config',
			'./src/rewrite.conf'
		])
		.pipe(gulp.dest('./release'));
});

gulp.task('fonts', () => {
	return gulp.src([
			'./src/static/fonts/**/*'
		])
		.pipe(gulp.dest('./release/static/fonts'));
});

gulp.task('images', () => {
	return gulp.src([
			'./src/static/images/**/*'
		])
		.pipe(gulp.dest('./release/static/images'));
});

gulp.task('dev', () => {
	gulp.watch([
		'src/static/scss/*.scss'
	], ['sass']);
	gulp.watch([
		'src/static/jsx/*.js'
	], ['core']);
	gulp.watch(amdPaths, ['amd']);
});

gulp.task('buildDemo', () => {
	return gulp.src([
		'./src/demo/**/*'
	]).pipe(gulp.dest('./release/demo'));
});

gulp.task('default', ['html', 'resource', 'fonts', 'images', 'buildDemo']);