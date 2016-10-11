module.exports = function(gulp, options, plugins) {
    gulp.task('unit-tests', function(done) {
        var flossOptions = {
            path: 'tests/index.js',
            debug: !!options.argv.debug
        };
        if (options.argv.coverage) {
            flossOptions.coveragePattern = 'dist/pixi-animate.js';
            flossOptions.coverageSourceMaps = true;
            flossOptions.coverageHtmlReporter = true;
        }
        plugins.floss(flossOptions, done);
    });
};