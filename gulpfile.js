var gulp = require('gulp');
require('jibo-gulp')(gulp, {
    dest: 'dist',
    name: 'pixi-animate',
    eslint: {
        globals: {
            PIXI: true
        }
    }
});