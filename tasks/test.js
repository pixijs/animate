"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('test', function(done) {
        plugins.sequence('lint', 'unit-tests', done);
    });
};