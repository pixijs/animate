// override base PixiJS versions with the pixi-animate extensions.
// have to override the PIXI object because individual sets may not work in all situations.
window.PIXI = Object.assign({}, PIXI, {
	Container: PIXI.animate.Container,
	Text: PIXI.animate.Text,
	Sprite: PIXI.animate.Sprite,
	Graphics: PIXI.animate.Graphics
});

// Deprecated version of class extension. Provided as support for old assets.
function extend(child) {
	child.prototype = Object.create(this.prototype);
	child.prototype.__parent = this.prototype;
	child.prototype.constructor = child;
	return child;
}

// set extend as static method on relevant classes
PIXI.Container.extend = PIXI.Container.e = extend;
PIXI.Text.extend = PIXI.Text.e = extend;
PIXI.Sprite.extend = PIXI.Sprite.e = extend;
PIXI.Graphics.extend = PIXI.Graphics.e = extend;
PIXI.animate.MovieClip.extend = PIXI.animate.MovieClip.e = extend;

// Replace Graphics.c as closePath instead of setColorTransform, as it was in 1.X
PIXI.Graphics.prototype.c = PIXI.Graphics.prototype.closePath;

// Put in a version of addHole() that works like PIXI v4
PIXI.Graphics.prototype.h = PIXI.Graphics.prototype.addHole = function() {
	const data = this.geometry.graphicsData.pop();
	data.fillStyle = null;
	this.geometry.graphicsData[this.geometry.graphicsData.length - 1].holes.push(data);
	return this;
}

// restore fromFrame(), which from() has subsumed
PIXI.Texture.fromFrame = PIXI.Texture.from;

// Create global library and shape data caches
PIXI.animate.ShapesCache = {};
window.lib = window.lib || {};

// wrap load() with one that intercepts and handles the v1 assets.
const realLoad = PIXI.animate.load;
PIXI.animate.load = function(scene, optionsOrComplete) {
	if (typeof scene === 'function') {
		scene = {
			stage: scene,
			assets: scene.assets,
			textures: PIXI.utils.TextureCache,
			shapes: PIXI.animate.ShapesCache,
			lib: window.lib
		};
	}
	return realLoad(scene, optionsOrComplete);
};