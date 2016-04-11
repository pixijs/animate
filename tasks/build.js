"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('build', plugins.bundler(gulp, options, plugins, false));
};