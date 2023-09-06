# Pixi Animate

A plugin for PixiJS which provides a runtime for content export using PixiAnimate Extension.

[![Build Status](https://travis-ci.org/pixijs/animate.svg?branch=master)](https://travis-ci.org/pixijs/animate) [![Dependency Status](https://david-dm.org/pixijs/animate.svg)](https://david-dm.org/pixijs/animate) [![npm version](https://badge.fury.io/js/animate.svg)](https://badge.fury.io/js/animate)

## Running Content

### Re-Export your `.fla`
Use this Animate CC plugin https://github.com/pixijs/animate-extension and follow this steps:
1. Install the plugin
1. Open your old `.fla` file
1. Convert to PixiJS Animate (from the File menu), creating a new `.fla` file
1. **From that new `.fla` file** go to publishing settings (from the File menu)
1. Select the V2 format on the first dropdown
1. Export your project, you should have a `.js` file and some folders with it.

**Only things added to the stage will be exported!**

### Installing Library

To run content exported with Pixi Animate, you must load the JavaScript library within your project. You can install using [NPM](http://www.npmjs.org) or your package manager of choice:

#### NPM
```
npm install @pixi/animate
```

### Dependencies

| PixiJS | @pixi/animate |
|---|---|
| v5.x - v6.x | v2.x |
| v7.x | v3.x |

## Documentation

https://pixijs.io/animate/docs/

## Breaking changes from v2.x to v3.x
* Compatibility with PixiJS v7
 * This means the library now uses `Assets` to download anything needed.
* Removed V1 export compatibility. Only V2 exports are now compatible.
 *  Removed tests for V1 assets

## Breaking Changes from v1.3
* DisplayObject, Container, Graphics, Sprite, and Text from PIXI are no longer modified. Instead, subclasses are provided from the library with the same names (or on the PIXI.animate namespace).
* static `extend()` and `e()` methods no longer exist on the display object classes.
* On Graphics, `c()` is no longer the shorthand for `closePath()`; instead, use `cp()`.
* On Graphics, `drawHole()` and `h()` no longer exist. Instead of making the previous shape a hole, use `beginHole()` (`bh()`) before drawing a hole and `endHole()` (`eh()`) when it is complete.
* ShapesCache no longer exists.
* The SymbolLoader plugin no longer exists, so individual images are no longer added to PIXI's global texture cache by resource name, and shape assets are no longer added to a global shape cache.

Using the legacy bundle file `dist/animate-legacy.js` (requires `PIXI` namespace to be set up) will restore the removed functionality so that assets published for the previous version of PixiAnimate will work correctly.

Changes that the legacy build doesn't account for:
* `load()` no longer has so many variants allowed. Instead, the first argument is always the scene that you want to load, followed by either a callback or an options object. If using the legacy build, pass in the constructor for the main scene MovieClip, as you did in v1.
* `createInstance` now defaults to false, instead of true, when calling `load()`.

### Asset changes
The expected asset format is now a module based asset that uses ES6 classes, for use with `require()` (publish for CommonJS) or `import()` (publish for ES6). A script has been provided to update v1 assets to the new format - `animate-upgrade` (see `bin/assetConversion.js` for the source).
* CommonJS export: `npx animate-upgrade path/to/myFile.js path/to/my2ndFile.js`
  * Asset object is the main, and only, export.
  * Example: `const asset = require('./myAsset');`
* ES6 export: `npx animate-upgrade -e path/to/myFile.js path/to/my2ndFile.js`
  * Asset object is the default, and only, export.
  * Example: `import asset from './myAsset'` or `const asset = await import('./myAsset')`;
* ES6 autorun export: `npx animate-upgrade -a path/to/myFile.js path/to/my2ndFile.js`
  * Asset automatically imports `'@pixi/animate'` and runs `setup()`. Individual library items are exported by name in addition to the default export.
  * Example: `import asset, {MyScene} from './myAsset'`

Note that this script will do its best to update graphics paths (`*.shapes.json` files), but you should confirm that they were properly updated (closePath & hole changes).

If you want to have a Typescript declaration specific to an individual asset file, use the `animate-type-assets` script to generate a .d.ts file. This script will work on any of the 3 variants of the current asset format.
Example: `npx animate-type-assets path/to/myFile.js path/to/my2ndFile.js`

## Considerations & Limitations in Animate
While we now support publishing tweens from Animate, there are some things to take into account to ensure that you get the smallest, most efficient asset size possible.

### Tweens
* Only classic tweens are supported at this time, not motion tweens (those are converted to keyframes automatically).
* Tweens that only affect color (alpha, tint, color adjustment) can't be detected during publishing, but will be included if your tween also affects the transformation (position, scale, rotation/skew).
* Custom ease curves are not supported at this time, only the default selection of eases.

### Considerations with Graphics
In order to maintain an accurate export, Animate creates a unique Graphic (MovieClip in the runtime) instance for each usage in your library of anything that is a Graphic on the timeline. This has a few effects:
* Tweens inside Graphics won't be exported, but instead converted to keyframes.
* When a Graphic is interrupted on the timeline, each use will be a different instance in the export, causing a little bloat.

In order to minimize your asset size, there are a few things that you can do:
* Do all of your tweening at as high a level as you can manage, in something that is a MovieClip on the timeline.
* Use one Graphic per layer, and don't have blank keyframes between uses of it or mix & match Graphic instances on the same layer.
* If a Graphic is just a single frame, or is always animating through its full timeline, make it a MovieClip on the timeline instead.

## License

Copyright (c) 2016 [Jibo, Inc.](http://github.com/jiborobot)

Released under the MIT License.
