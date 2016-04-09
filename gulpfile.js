var gulp = require('gulp');
require('jibo-gulp')(gulp, {
    dest: 'dist',
    name: 'pixi-animate',
    tests: 'tests/**/*.{ts,js}',
    src: ['src/**/*.{ts,js}'],
    lint: ['src/**/*.js', 'tests/**/*.js'],
    tslintSrc: ['src/**/*.ts'],
    pipeline: 'typescript',
    addsrc: 'typings/main.d.ts',
    dts: '../typings',
    eslint: {
        globals: {
            PIXI: true
        }
    }
});