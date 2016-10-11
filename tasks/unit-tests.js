module.exports = function(gulp, options, plugins) {
    gulp.task('unit-tests', function(done) {
        plugins.floss({
            path: 'tests/index.js',
            debug: !!options.argv.debug,
            coveragePattern: 'dist/pixi-animate.js',
            coverageSourceMaps: true,
            coverageHtmlReporter: options.argv.coverage || false
        }, done);
    });
};