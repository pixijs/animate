"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('unit-tests', function() {
        return gulp.src(options.tests, {
                read: false
            })
            // gulp-mocha needs filepaths so you can't have any plugins before it 
            .pipe(plugins.mocha({
                reporter: 'spec'
            }));
    });
};