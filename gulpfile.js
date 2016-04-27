// A. REGISTER COMPONENTS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    jscs = require('gulp-jscs')
    
;

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// B. CSS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('compile-sass', function () {

        gulp.src('public/ignored_stuff/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/'));

});

// B. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// C. JAVASCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Lint Task
gulp.task('lint', function() {
    return gulp.src('public/ignored_stuff/js/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('public/ignored_stuff/js/scripts/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/scripts'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts'));
});

// C. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// B. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task("start", function () {

    connect.server(
        
        {
            root: "public",
            port: 3000,
            livereload: true,
            middleware: function(connect, opt) {
                return [
                    connect().use('/bower_components', connect.static('./bower_components'))
                ]
            }
        });
    
        livereload.listen();
    
        gulp.watch(['public/*.html',
                    'public/*/*.html',
                    'public/**/*/*.html',
                    'public/styles/stylesheet.css',
                    'public/scripts/js/app.js']);
    
        gulp.watch('public/ignored_stuff/**/*.scss', ['compile-sass']);
        gulp.watch('public/ignored_stuff/js/scripts/*', ['lint', 'scripts']);
        

});