module.exports = function(gulp, options, plugins) {
    gulp.task('format', function() {
        return gulp
            .src(options.format)
            .pipe(plugins.prettify({
                mode: 'VERIFY_AND_WRITE',
                logSuccess: false
            }))
            .pipe(gulp.dest(function(data) {
                return data.base;
            }));
    });
};