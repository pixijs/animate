"use strict";

const gulp = require('gulp');

const pkg = require('./package.json');
const src = 'src/**/*.js';
const options = {
    dest: 'dist',
    app: 'src',
    name: 'pixi-animate',
    map: 'dist/pixi-animate.js.map',
    clean: ['dist', 'docs'],
    deploy: './docs/**/*',
    docs: 'docs',
    src: src,
    pkg, pkg,
    lint: [src, 'tests/*.js'],
    format: [src, 'tests/*.js', 'tasks/*.js'],
    tests: 'tests',
    eslint: {
        extends: ['eslint:recommended'],
        rules: {
            "no-console": 0,
            "no-debugger": 1
        },
        parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true
            }
        },
        envs: {
            node: true,
            browser: true,
            es6: true,
            mocha: true
        },
        globals: {
            PIXI: true
        }
    }
};

const plugins = {
    eslint: require('gulp-eslint'),
    buffer: require('vinyl-buffer'),
    source: require('vinyl-source-stream'),
    browserify: require('browserify'),
    prettify: require('gulp-jsbeautifier'),
    uglify: require('gulp-uglify'),
    sequence: require('gulp-sequence').use(gulp),
    exorcist: require('exorcist'),
    preprocess: require('gulp-preprocess'),
    mocha: require('gulp-mocha'),
    babelify: require('babelify'),
    chalk: require('chalk'),
    del: require('del'),
    ghPages: require('gulp-gh-pages'),
    yuidoc: require('gulp-yuidoc'),
    errors: require('./tasks/common/errors'),
    bundler: require('./tasks/common/bundler'),
    pkg: pkg,
    header: function()
    {
        var fs = require('fs');
        var header = require('gulp-header');
        return header(fs.readFileSync('header.txt', 'utf8'), {
            pkg: pkg 
        });
    },
};

require('load-gulp-tasks')(gulp, options, plugins);