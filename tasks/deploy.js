"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('deploy', function() {
        return gulp.src(options.deploy)
            .pipe(plugins.ghPages());
    });
};