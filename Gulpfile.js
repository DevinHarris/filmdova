const gulp = require('gulp'),
	sass = require('gulp-sass'),
	pump = require('pump'),
	uglify = require('gulp-uglify'),
	bs = require('browser-sync').create(),
	babel = require('gulp-babel');

gulp.task('sass', () => {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./public/css'))
		.pipe(bs.stream({match: '**/*.css'}));
});

/*gulp.task('uglify', (cb) => {
	pump([
		gulp.src('./public/js/*.js'),
		uglify(),
		gulp.dest('.public/js/min')
	],
		cb
	)
}); */

gulp.task('build', () => {
	return gulp.src('./src/js/**/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
})

gulp.task('default', () => {
	console.log('working');

	bs.init({
		server: {
			baseDir: './'
		},

		https: true
	});

	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', ['build']).on('change', bs.reload);
	gulp.watch('index.html').on('change', bs.reload);
})