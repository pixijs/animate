"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('default', function(done) {
        return plugins.sequence(
            'clean',
            'lint',
            'format',
            'build',
            'build-debug',
            done
        );
    });
};