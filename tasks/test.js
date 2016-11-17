module.exports = function(gulp, options, plugins) {
    gulp.task('test', function(done) {
        var coverage = options.argv.coverage;
        plugins.floss({
            path: 'tests/index.js',
            debug: !!options.argv.debug,
            coveragePattern: coverage ? 'dist/pixi-animate.js' : null,
            coverageSourceMaps: true,
            coverageHtmlReporter: coverage || false
        }, done);
    });
};