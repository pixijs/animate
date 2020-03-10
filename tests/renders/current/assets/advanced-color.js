const data = {
    stage: null,
    background: 0xffffff,
    width: 32,
    height: 32,
    framerate: 24,
    totalFrames: 1,
    assets: {
        "advanced_color": "images/advanced_color.shapes.json"
    },
    lib: {},
    shapes: {}, // should be filled by loader from shapes loaded from assets
    textures: {}, // should be filled by loader with individual images from assets
    spritesheets: [], // should be filled by loader with spritesheets from assets
    // TODO: method for getting textures (can be externally set to PIXI.Texture.from())
    getTexture: function(id) {
        if (data.textures[id]) {
            return data.textures[id];
        }
        const atlas = data.spritesheets.find(atlas => !!atlas.textures[id]);
        return atlas ? atlas.textures[id] : null;
    },
    
    setup: function(animate) {
        // pulls classes from animate (the animate namespace)
        // puts classes for all the library items in data.library, also puts the root one in data.stage
        
        const MovieClip = animate.MovieClip;
        const Container = animate.Container;
        const Graphics = animate.Graphics;

        data.lib.Graphic1 = class extends Container {
            constructor() {
                super();
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.advanced_color[0]);
                this.addChild(instance1);
            }
        };

        data.lib.advanced_color = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 24
                });
                const instance1 = new data.lib.Graphic1()
                    .setTransform(16, 16)
                    .setColorTransform(1, 0.42, -0.69, 0.09, 0.31, 0.89);
                this.addChild(instance1);
            }
        };
        
        data.stage = data.lib.advanced_color;
    }
};

// ** choose mutually exclusive output type when publishing **
// CommonJS output
module.exports = data;
// ES6 output
// export default data;