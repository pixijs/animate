"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('docs-live', function(done) {
        return plugins.sequence('docs', 'deploy', done);
    });
};