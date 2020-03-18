const data = {
	stage: null,
    background: 0xffffff,
    width: 32,
    height: 32,
    framerate: 24,
    totalFrames: 1,
	assets: {
        "Bitmap 1": "images/Bitmap 1.png"
    },
	lib: {},
	shapes: {},
	textures: {},
	spritesheets: [],
	getTexture: function(id) {
		if (data.textures[id]) {
			return data.textures[id];
		}
		const atlas = data.spritesheets.find(atlas => !!atlas.textures[id]);
		return atlas ? atlas.textures[id] : null;
	},
	setup: function(animate) {
	

    const MovieClip = animate.MovieClip;
    const Container = animate.Container;
    const Sprite = animate.Sprite;

    data.lib.Graphic1 = class extends Container {
    constructor() {
        super();
        const instance1 = new Sprite(data.getTexture("Bitmap 1"))
            .setTransform(-12, -12);
        this.addChild(instance1);
    }
    }

    data.lib.bitmap_symbol = class extends MovieClip {
    constructor() {
        super({
            duration: 1,
            framerate: 24
        });
        const instance1 = new data.lib.Graphic1()
            .setTransform(16, 16);
        this.addChild(instance1);
    }
    }

    data.stage = data.lib.bitmap_symbol;

	}
};

module.exports = data;