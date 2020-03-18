const data = {
	stage: null,
    background: 0xffffff,
    width: 32,
    height: 32,
    framerate: 24,
    totalFrames: 3,
	assets: {
        "tween_alpha_tint": "images/tween_alpha_tint.shapes.json"
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
    const Graphics = animate.Graphics;

    const Graphic1 = class extends MovieClip {
    constructor(mode) {
        super({ mode: mode, duration: 3, loop: false });
        const instance1 = new Graphics()
            .drawCommands(data.shapes.tween_alpha_tint[0]);
        this.addTimedChild(instance1);
    }
    }

    data.lib.tween_alpha_tint = class extends MovieClip {
    constructor() {
        super({
            duration: 3,
            framerate: 24
        });
        const instance1 = new Graphic1(MovieClip.SYNCHED);
        this.addTimedChild(instance1, 0, 3, {
            "0": {
                x: 16,
                y: 16,
                a: 0,
                c: [
                    1,
                    0,
                    1,
                    0,
                    1,
                    0
                ]
            },
            "1": {
                a: 0.5,
                c: [
                    0.5,
                    0,
                    0.5,
                    0,
                    0.5,
                    0.5
                ]
            },
            "2": {
                a: 1,
                c: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    1
                ]
            }
        });
    }
    }

    data.stage = data.lib.tween_alpha_tint;

	}
};

module.exports = data;