(function (lib) {

var MovieClip = PIXI.animate.MovieClip;
var Graphics = PIXI.Graphics;
var graphics = PIXI.animate.ShapesCache;

// stage content:
lib.Masking = MovieClip.extend(function(mode, startPosition, loop)
{
	if (loop === undefined)
		loop = true;
	MovieClip.call(this, mode, startPosition, loop);
	
	this._frameDuration = 25;

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
	
	this.tw(this.shape, {x:75, y:72}, 0, 12).tw(this.shape, {x:100, y:300}, 12, 25);
	//this.tw(this.shape, {m: mask_graphics_12}, 0, 12);

	this.ac(
		this.shape,
		mask_graphics_0,
		mask_graphics_12
	);
});

})(lib = lib||{});
var lib;