"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('unit-tests', function(done) {
        plugins.floss.run({
            path: 'tests/index.js',
            debug: !!(options.argv && options.argv.debug)
        }, done)
    });
};