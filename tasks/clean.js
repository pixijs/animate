module.exports = function(gulp, options, plugins) {
    gulp.task('clean', function() {
        return plugins.del(options.clean);
    });
};