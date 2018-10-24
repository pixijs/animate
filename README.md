# PIXI Animate

A plugin for Pixi.js which provides a runtime for content export using PixiAnimate Extension.

[![Build Status](https://travis-ci.org/jiborobot/pixi-animate.svg?branch=master)](https://travis-ci.org/jiborobot/pixi-animate) [![Dependency Status](https://david-dm.org/jiborobot/pixi-animate.svg)](https://david-dm.org/jiborobot/pixi-animate) [![npm version](https://badge.fury.io/js/pixi-animate.svg)](https://badge.fury.io/js/pixi-animate)

## Running Content

### Installing Library

To run content exported with PixiAnimate, you must load the JavaScript library within your project. You can install using [Bower](http://bower.io) or [NPM](http://www.npmjs.org):

#### NPM
```
npm install pixi-animate
```

### Dependencies

* [Pixi.js v4](http://pixijs.com) is required

## Documentation

https://pixijs.io/pixi-animate/

## Typescript
You can use require to get the namespace for PixiAnimate, or use a triple slash reference for using the PIXI.animate namespace.
```typescript
// Note: Must also include the pixi.js typings globally!
import animate = require('pixi-animate');

let myMC:animate.MovieClip = new animate.MovieClip();
```

```typescript
// Note: Must also include the pixi.js typings globally!
/// <reference path="node_modules/pixi-animate/ambient.d.ts" />
require('pixi-animate');

let myMC:PIXI.animate.MovieClip = new PIXI.animate.MovieClip();
```

## License

Copyright (c) 2016 [Jibo, Inc.](http://github.com/jiborobot)

Released under the MIT License.
