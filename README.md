# PIXI Animate

A library for bridging CreateJS animations from Flash for use in Pixi.js. Publish Flash content like you normally would for CreateJS (with an HTML5 Canvas document), but export for Pixi.js instead. While there are some [known issues](https://github.com/jiborobot/pixi-animate#known-issues) with this approach, it produces fast animation playback for WebGL and is superior to using Flash's WebGL document.

## Examples

* [Animation using all bitmaps](http://cloudkidstudio.github.io/pixi-animate/examples/animation/)
* [Animation using all vectors](http://cloudkidstudio.github.io/pixi-animate/examples/shapes/)
* [Masking](http://cloudkidstudio.github.io/pixi-animate/examples/masking/)
* [Color Effects](http://cloudkidstudio.github.io/pixi-animate/examples/color_effects/)
* [Text](http://cloudkidstudio.github.io/pixi-animate/examples/text/)

_Animated examples are from [Fizzy's Lunch Lab](http://pbskids.org/lunchlab/) and used with permission from Lunch Lab, LLC_

## Running Content

### Installing Library

To run content exported with PixiAnimate, you must load the JavaScript library within your project. You can install using [Bower](http://bower.io) or [NPM](http://www.npmjs.org):

#### Bower
```
bower install pixi-animate
```
#### NPM
```
npm install pixi-animate
```

### Dependencies

* [Pixi.js](http://pixijs.com) is required

### Usage

Here's a example using PIXI where the images were assembled using TexturePacker. See the **example** folder for an example which uses the Flash SpriteSheet exporting.

```js
var renderer = new PIXI.autoDetectRenderer(800, 500);
var stage = new PIXI.Container();

// Load the atlas for the character
var loader = new PIXI.loaders.Loader()
	// This atlas is created with TexturePacker from the 
	// output individual images from Flash publishing
	.add('CharacterAtlas',"CharacterAtlas.json");
	.once('complete',function(loader, resources)
	{
		// Create the character, all library symbols live
		// on the lib window object
		var character = new lib.Character();
		character.play();

		// Add to stage
		stage.addChild(character);
	})
	.load();
update();
function update()
{
    requestAnimationFrame(update);
    renderer.render(stage);
}
```

##Documentation

http://jiborobot.github.io/pixi-animate/docs/

##License

Copyright (c) 2016 [Jibo, Inc.](http://github.com/jiborobot)

Released under the MIT License.
