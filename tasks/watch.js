module.exports = function(gulp, options, plugins) {
    gulp.task('watch', function() {
        gulp.watch(options.src, ['lint', 'build-debug']);
    });
};