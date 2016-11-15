module.exports = function(gulp, options, plugins) {
    gulp.task('copy', function() {
        return gulp.src(options.copy)
            .pipe(gulp.dest(options.dest));
    });
};