"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('build-debug', plugins.bundler(gulp, options, plugins, true));
};