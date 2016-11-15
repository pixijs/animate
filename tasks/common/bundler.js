"use strict";

module.exports = function(gulp, options, plugins, debug) {

    function header() {
        return plugins.header(
            plugins.fs.readFileSync(__dirname + '/header.txt', 'utf8'), {
                pkg: options.pkg
            }
        );
    }

    return function(done) {
        var bundler = plugins.browserify({
            entries: options.argv.app || options.app,
            ignoreMissing: true,
            detectGlobals: false,
            insertGlobals: false,
            bundleExternal: false,
            standalone: options.name,
            debug: debug
        });

        let stream = bundler
            .transform(plugins.babelify.configure({
                presets: [ ['es2015', {loose: true}] ],
                sourceMaps: true
            }))
            .bundle()
            .on('error', function(err) {
                let error = plugins.chalk.red;
                let stack = String(err.stack);
                stack = stack.substr(stack.indexOf('\n') + 1);
                console.error(error.bold(err));
                console.error(error(stack));
                done();
            });

        if (debug)
        {
            stream = stream.pipe(plugins.exorcist(options.map));
        }
        let name = debug ? options.name + '.js' : options.name + '.min.js';
        stream = stream.pipe(plugins.source(name))
            .pipe(plugins.buffer())
            .pipe(plugins.preprocess({
                context: {
                    DEBUG: debug,
                    RELEASE: !debug,
                    VERSION: options.pkg.version
                }
            }));

        if (!debug)
        {
            stream = stream.pipe(plugins.uglify());
        }
        return stream
            .pipe(header())
            .pipe(gulp.dest(options.dest));
    }
};
