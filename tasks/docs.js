"use strict";

module.exports = function(gulp, options, plugins) {
    gulp.task('docs', function() {
        return gulp
            .src(options.src)
            .pipe(plugins.yuidoc.parser({
                project: {
                    name: options.pkg.name,
                    description: options.pkg.description,
                    version: options.pkg.version,
                    url: options.pkg.homepage
                }
            }))
            .pipe(plugins.yuidoc.reporter())
            .pipe(plugins.yuidoc.generator({
                paths: 'src',
                themedir: "node_modules/yuidoc-lucid-theme",
                helpers: ["node_modules/yuidoc-lucid-theme/helpers/helpers.js"]
            }))
            .pipe(gulp.dest(options.docs))
    });
};