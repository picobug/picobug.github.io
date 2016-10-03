var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	webpack = require('webpack'),
	fontawesome = require('node-font-awesome'),
	stream = require('webpack-stream');

var
    source = './src/',
    dest = './dist/';

var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
    };

var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*',fontawesome.fonts],
        out: dest + 'fonts/'
    };

var scss = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'compressed',
        // outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets',fontawesome.scssPath]
    }
};

gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

gulp.task('sass', ['fonts'], function() {
	return gulp.src(source+'sass/**/*.scss')
	.pipe(sass(scss.sassOpts))
	.pipe(autoprefixer())
	.pipe(gulp.dest(dest+'css'))
});

gulp.task('scripts', function() {
	return gulp.src(source+'js/**/*.js')
	.pipe(stream({
		output: {
			path: __dirname + '/dist/js',
			filename: 'all.js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: ['babel-loader'],
					query: {
						presets: ['es2015']
					}
				}
			]
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({minimize: true})
		]
	}))
	.pipe(gulp.dest(dest+'js'))
});

gulp.task('serve', function() {
	browserSync.init({
		proxy: 'localhost/picobug.github.io'
	});

	gulp.watch(source+'sass/**/*.scss',['sass']);
	gulp.watch(source+'js/**/*.js',['scripts']);
	gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default',['sass','scripts','serve']);
