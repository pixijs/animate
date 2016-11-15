module.exports = function(gulp, options, plugins) {
    gulp.task('lint', function() {
        return gulp
            .src(options.lint)
            .pipe(plugins.eslint(options.eslint))
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failAfterError());
    });
};