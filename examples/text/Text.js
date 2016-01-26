(function (lib) {

var Container = PIXI.Container;
var Text = PIXI.Text;
var Graphics = PIXI.Graphics;
var graphics = PIXI.animate.GraphicsCache;

// stage content:
lib.Text = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.text = new Text("Prepare to die.", {
		font: "35px 'Verdana'", 
		fill: 0x33CC00,
		lineHeight: 37,
		wordWrap: true,
		wordWrapWidth: 511,
		padding: 10
	})
	.al('right')
	.tr(654,285);

	this.text_1 = new Text("You killed my father.", {
		font: "35px 'Times'", 
		fill: "#1F2CB4",
		lineHeight: 37,
		wordWrap: true,
		wordWrapWidth: 511,
		padding: 10
	})
	.al('center')
	.tr(398.5,237)
	.sh(0xFFFFFF);

	this.text_2 = new Text("My name is Inigo Montoya.", {
		font: "35px 'Helvetica'", 
		fill: "#FF0000",
		lineHeight: 37,
		wordWrap: true,
		wordWrapWidth: 510,
		padding: 10
	})
	.tr(143,185);

	// Layer 4
	this.shape = new Graphics()
		.d(graphics.Text);

	this.ac(
		this.shape,
		this.text_2,
		this.text_1,
		this.text
	);

});

})(lib = lib||{});
var lib;