(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
var MovieClip = cjs.MovieClip;
var Tween = cjs.Tween;
var Rectangle = cjs.Rectangle;
var Container = cjs.Container;
var Shape = cjs.Shape;

// library properties:




// symbols:



(lib.Tween3 = function() {
	var shape;
	this.initialize();

	// Layer 1
	shape = this.shape = new Shape();
	shape.graphics.f("#666699").s().dr(-94,-148.5,188,297);

	this.addChild(shape);
}).prototype = p = new Container();
p.nominalBounds = new Rectangle(-94,-148.4,188,297);


// stage content:
(lib.Masking = function(mode,startPosition,loop) {
	var instance;
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	instance = this.instance = new lib.Tween3("synched",0);
	instance.setTransform(350,259.5);

	this.timeline.addTween(Tween.get(instance).to({x:558},24).wait(1));

}).prototype = p = new MovieClip();
p.nominalBounds = new Rectangle(651,361,188,297);

})(pixiflash_lib = pixiflash_lib||{}, pixiflash_images = pixiflash_images||{}, pixiflash = pixiflash||{}, ss = ss||{});
var pixiflash_lib, pixiflash_images, pixiflash, ss;