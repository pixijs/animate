(function (lib) {

// Include classes
var Sprite = PIXI.Sprite;
var Container = PIXI.Container;
var Graphics = PIXI.Graphics;
var fromFrame = PIXI.Texture.fromFrame;
var graphics = PIXI.animate.GraphicsCache;

// symbols:
lib.Bitmap1 = Sprite.extend(function()
{
	Sprite.call(this, fromFrame("Bitmap1"));
});

lib.Bitmap2 = Sprite.extend(function()
{
	Sprite.call(this, fromFrame("Bitmap2"));
});

lib.ShapeFace = Container.extend(function()
{
	Container.call(this);
	this.shape = new Graphics()
		.d(graphics.ShapeFace);
	this.ac(this.shape);
});

lib.BitmapFace = Container.extend(function() 
{
	Container.call(this);

	// Layer 2
	this.instance = new lib.Bitmap1()
		.tr(-58,-46.1);

	// Layer 1
	this.instance_1 = new lib.Bitmap2()
		.tr(-113.1,-114.1);

	this.ac(
		this.instance_1,
		this.instance
	);
});

// stage content:
lib.ColorEffects = Container.extend(function()
{
	Container.call(this);

	// Layer 2
	this.instance = new lib.BitmapFace()
		.tr(126,125.1,1,1,0,0,0,0.9,0);

	this.instance_1 = new lib.ShapeFace()
		.tr(372,125,1,1,0,0,0,1,0);

	this.instance_2 = new lib.BitmapFace()
		.tr(126,594,1,1,0,0,0,0.9,0)
		.tn(0xFF0D54);

	this.instance_3 = new lib.BitmapFace()
		.tr(126,360,1,1,0,0,0,0.9,0)
		.tn(0xD3FF00);

	this.instance_4 = new lib.ShapeFace()
		.tr(372,593.9,1,1,0,0,0,1,0)
		.tn(0x365AFF);

	this.instance_5 = new lib.ShapeFace()
		.tr(372,359.9,1,1,0,0,0,1,0)
		.tn(0xD95AFF);

	this.ac(
		this.instance_5,
		this.instance_4,
		this.instance_3,
		this.instance_2,
		this.instance_1,
		this.instance
	);
});

})(lib = lib||{});
var lib;