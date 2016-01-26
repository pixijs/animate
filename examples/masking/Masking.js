(function (lib) {

var MovieClip = PIXI.Container;
var Graphics = PIXI.Graphics;
var graphics = PIXI.animate.GraphicsCache;

// stage content:
lib.Masking = MovieClip.extend(function(mode, startPosition, loop)
{
	MovieClip.call(this, mode, startPosition, loop);

	// Layer 2 (mask)
	var mask_graphics_0 = new Graphics()
		.d(graphics.mask_graphics_0);
		
	var mask_graphics_12 = new Graphics()
		.d(graphics.mask_graphics_12);

	// this.timeline.addTween(
	// 	Tween.get(this)
	// 		.to({ mask: mask_graphics_0 })
	// 		.wait(12)
	// 		.to({ mask: mask_graphics_12 })
	// 		.wait(13)
	// );

	// Layer 3
	this.shape = new Graphics()
		.d(graphics.Masking)
		.ma(mask_graphics_0);

	// this.timeline.addTween(Tween.get(shape).wait(25));

	this.ac(
		this.shape,
		mask_graphics_0,
		mask_graphics_12
	);

});

})(lib = lib||{});
var lib;