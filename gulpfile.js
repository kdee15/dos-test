var gulp = require("gulp"),
    connect = require("gulp-connect"),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer')
;

// A. CSS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

gulp.task('compile-sass', function () {

        gulp.src('public/ignored_stuff/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/'));

});

// A. END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




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
        gulp.watch('public/ignored_stuff/**/*.scss', ['compile-sass']);
        

});