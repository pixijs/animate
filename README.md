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
* ShapesCache no longer exists.
* The SymbolLoader plugin no longer exists, so individual images are no longer added to PIXI's global texture cache by resource name, and shape assets are no longer added to a global shape cache.

Loading the file `v1-asset-shim.js` (requires `PIXI` and `PIXI.animate` namespaces to be set up) will restore the removed functionality so that assets published for the previous version of PixiAnimate will work correctly.

Changes that the shim doesn't account for:
* `load()` no longer has so many variants allowed. Instead, the first argument is always the scene that you want to load, followed by either a callback or an options object. If using the legacy shim, pass in the constructor for the main scene MovieClip, as you did in v1.
* `createInstance` now defaults to false, instead of true, when calling `load()`.

### Asset changes
The expected asset format is now a module based asset that uses ES6 classes, for use with `require()` (publish for CommonJS) or `import()` (publish for ES6). A script has been provided to update v1 assets to the new format - `scripts/assetConversion.js`.
* CommonJS export: `node node_modules/pixi-animate/assetConversion.js path/to/myFile.js path/to/my2ndFile.js`
* ES6 export: `node node_modules/pixi-animate/assetConversion.js -e path/to/myFile.js path/to/my2ndFile.js`

Note that this script does not update graphics paths - you will have to go into your `*.shapes.*` files and replace `"c"` with `"cp"`.

## Typescript
You can use require to get the namespace for PixiAnimate:
```typescript
import animate = require('pixi-animate');

let myMC:animate.MovieClip = new animate.MovieClip();
```

Or use a triple slash reference for using the PIXI.animate namespace:
```typescript
// Note: Must also include the pixi.js typings globally!
/// <reference path="node_modules/pixi-animate/dist/pixi-animate-ambient.d.ts" />
// In your HTML:
// <script src="node_modules/pixi-animate/dist/pixi-animate.d.ts"></script>

let myMC:PIXI.animate.MovieClip = new PIXI.animate.MovieClip();
```

## License

Copyright (c) 2016 [Jibo, Inc.](http://github.com/jiborobot)

Released under the MIT License.
