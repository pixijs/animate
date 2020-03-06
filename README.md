# PIXI Animate

A plugin for Pixi.js which provides a runtime for content export using PixiAnimate Extension.

[![Build Status](https://travis-ci.org/pixijs/pixi-animate.svg?branch=master)](https://travis-ci.org/pixijs/pixi-animate) [![Dependency Status](https://david-dm.org/pixijs/pixi-animate.svg)](https://david-dm.org/pixijs/pixi-animate) [![npm version](https://badge.fury.io/js/pixi-animate.svg)](https://badge.fury.io/js/pixi-animate)

## Running Content

### Installing Library

To run content exported with PixiAnimate, you must load the JavaScript library within your project. You can install using [Bower](http://bower.io) or [NPM](http://www.npmjs.org):

#### NPM
```
npm install pixi-animate
```

### Dependencies

* [Pixi.js v5](http://pixijs.com) is required

## Documentation

https://pixijs.io/pixi-animate/

## Breaking Changes from v1.3
* DisplayObject, Container, Graphics, Sprite, and Text from PIXI are no longer modified. Instead, subclasses are provided from the library with the same names (or on the PIXI.animate namespace).
* static `extend()` and `e()` methods no longer exist on the display object classes.
* On Graphics, `c()` is no longer the shorthand for `closePath()`; instead, use `cp()`.
* On Graphics, `drawHole()` and `h()` no longer exist. Instead of making the previous shape a hole, use `beginHole()` (`bh()`) before drawing a hole and `endHole()` (`eh()`) when it is complete.

Loading the file `v1-asset-shim.js` (requires `PIXI` and `PIXI.animate` namespaces to be set up) will restore these changes so that assets published for the previous version of PixiAnimate will work correctly.

## Typescript
You can use require to get the namespace for PixiAnimate:
```typescript
// Note: Must also include the pixi.js typings globally!
import animate = require('pixi-animate');

let myMC:animate.MovieClip = new animate.MovieClip();
```

Or use a triple slash reference for using the PIXI.animate namespace:
```typescript
// Note: Must also include the pixi.js typings globally!
/// <reference path="node_modules/pixi-animate/ambient.d.ts" />
require('pixi-animate');

let myMC:PIXI.animate.MovieClip = new PIXI.animate.MovieClip();
```

Or simply import pixi-animate (after importing pixi.js):
```typescript
// Note: Must also include the pixi.js typings globally!
import('pixi-animate');
```

## License

Copyright (c) 2016 [Jibo, Inc.](http://github.com/jiborobot)

Released under the MIT License.
