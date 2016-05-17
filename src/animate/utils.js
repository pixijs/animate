const SharedTicker = PIXI.ticker.shared;

// Number of assets to upload per frame
let _uploadsPerFrame = 4;

// Collectsion of graphics and textures
const _graphics = [];
const _textures = [];

/**
 * @namespace PIXI.animate
 * @class utils
 * @private
 * @description For keyframe conversions
 */
export default class AnimateUtils {

    /**
     * Convert the Hexidecimal string (e.g., "#fff") to uint
     * @static
     * @method hexToUint
     */
    static hexToUint(hex) {
        // Remove the hash
        hex = hex.substr(1);

        // Convert shortcolors fc9 to ffcc99
        if (hex.length === 3) {
            hex = hex.replace(/([a-f0-9])/g, '$1$1');
        }
        return parseInt(hex, 16);
    }

    /** 
     * Fill frames with booleans of true (showing) and false (hidden).
     * @static
     * @method fillFrames
     * @param {Array<Boolean>} timeline
     * @param {int} startFrame The start frame when the timeline shows up
     * @param {int} duration The length of showing
     */
    static fillFrames(timeline, startFrame, duration) {
        //ensure that the timeline is long enough
        const oldLength = timeline.length;
        if (oldLength < startFrame + duration) {
            timeline.length = startFrame + duration;
            //fill any gaps with false to denote that the child should be removed for a bit
            if (oldLength < startFrame) {
                //if the browser has implemented the ES6 fill() function, use that
                if (timeline.fill) {
                    timeline.fill(false, oldLength, startFrame);
                } else {
                    //if we can't use fill, then do a for loop to fill it
                    for (let i = oldLength; i < startFrame; ++i) {
                        timeline[i] = false;
                    }
                }
            }
        }
        //if the browser has implemented the ES6 fill() function, use that
        if (timeline.fill) {
            timeline.fill(true, startFrame, startFrame + duration);
        } else {
            const length = timeline.length;
            //if we can't use fill, then do a for loop to fill it
            for (let i = startFrame; i < length; ++i) {
                timeline[i] = true;
            }
        }
    }

    /**
     * Convert serialized array into keyframes
     * `"0x100y100 1x150"` to: `{ "0": {"x":100, "y": 100}, "1": {"x": 150} }`
     * @static
     * @method deserializeKeyframes
     * @param {String} keyframes
     * @param {Object} Resulting keyframes
     */
    static deserializeKeyframes(keyframes) {
        let result = {};
        let i = 0;
        let keysMap = {
            X: 'x', // x position
            Y: 'y', // y position
            A: 'sx', // scale x
            B: 'sy', // scale y
            C: 'kx', // skew x
            D: 'ky', // skew y
            R: 'r', // rotation
            L: 'a', // alpha
            T: 't', // tint
            F: 'c', // colorTransform
            V: 'v' // visibility
        };
        let c,
            buffer = '',
            isFrameStarted = false,
            prop,
            frame = {};

        while (i <= keyframes.length) {
            c = keyframes[i];
            if (keysMap[c]) {
                if (!isFrameStarted) {
                    isFrameStarted = true;
                    result[buffer] = frame;
                }
                if (prop) {
                    frame[prop] = this.parseValue(prop, buffer);
                }
                prop = keysMap[c];
                buffer = '';
                i++;
            }
            // Start a new prop
            else if (!c || c === ' ') {
                i++;
                frame[prop] = this.parseValue(prop, buffer);
                buffer = '';
                prop = null;
                frame = {};
                isFrameStarted = false;
            } else {
                buffer += c;
                i++;
            }
        }
        return result;
    }

    /**
     * Convert serialized shapes into draw commands for PIXI.Graphics.
     * @static
     * @method deserializeShapes
     * @param {String} str
     * @param {Array} Resulting shapes map
     */
    static deserializeShapes(str) {
        const result = [];
        // each shape is a new line
        let shapes = str.split("\n");
        let isCommand = /^[a-z]{1,2}$/;
        for (let i = 0; i < shapes.length; i++) {
            let shape = shapes[i].split(' '); // arguments are space separated
            for (let j = 0; j < shape.length; j++) {
                // Convert all numbers to floats, ignore colors
                let arg = shape[j];
                if (arg[0] !== '#' && !isCommand.test(arg)) {
                    shape[j] = parseFloat(arg);
                }
            }
            result.push(shape);
        }
        return result;
    }

    /** 
     * Parse the value of the compressed keyframe.
     * @method parseValue
     * @static
     * @private
     * @param {String} prop The property key
     * @param {String} buffer The contents
     * @return {*} The parsed value
     */
    static parseValue(prop, buffer) {
        switch (prop) {
            // Color transforms are parsed as an array
            case 'c':
                {
                    buffer = buffer.split(',');
                    buffer.forEach(function(val, i, buffer) {
                        buffer[i] = parseFloat(val);
                    });
                    return buffer;
                }
                // Tint value should not be converted
                // can be color uint or string
            case 't':
                {
                    return buffer;
                }
                // The visiblity parse as boolean
            case 'v':
                {
                    return !!parseInt(buffer);
                }
                // Everything else parse a floats
            default:
                {
                    return parseFloat(buffer);
                }
        }
    }

    /**
     * The number of graphics or textures to upload to the GPU, if using
     * utils.upload and WebGLRenderer
     * @property {int} UPLOADS_PER_FRAME
     * @static
     * @default 4
     */
    static set UPLOADS_PER_FRAME(value) {
        _uploadsPerFrame = value;
    }
    static get UPLOADS_PER_FRAME() {
        return _uploadsPerFrame;
    }

    /** 
     * Upload all the textures and graphics to the GPU. 
     * @method upload
     * @static
     * @param {PIXI.WebGLRenderer} renderer Render to upload to
     * @param {PIXI.DisplayObject} clip MovieClip to upload
     * @param {function} done When complete
     */
    static upload(renderer, displayObject, done) {

        // No need to upload if CanvasRenderer
        if (!(renderer instanceof PIXI.WebGLRenderer)) {
            return done();
        }

        // Get global properties
        const textures = _textures;
        const graphics = _graphics;

        // Get the items for upload from the display
        this.getUploadable(displayObject, textures, graphics);

        let numLeft = this.UPLOADS_PER_FRAME;

        const update = () => {

            // Upload the graphics
            while (graphics.length && numLeft) {
                renderer.plugins.graphics.updateGraphics(graphics.pop());
                numLeft--;
            }

            // Upload the textures
            while (textures.length && numLeft) {
                renderer.textureManager.updateTexture(textures.pop());
                numLeft--;
            }

            // We're finished
            if (textures.length || graphics.length) {
                numLeft = this.UPLOADS_PER_FRAME;
            } else {
                SharedTicker.remove(update);
                done();
            }
        };

        // Listen to frame updates
        SharedTicker.add(update);
    }

    /**
     * Get the list of renderable items.
     * @method getUploadable
     * @static
     * @private
     * @param {PIXI.DisplayObject} displayObject 
     * @param {Array<PIXI.Texture>} textures Collection of textures
     * @param {Array<PIXI.Graphics>} graphics Collection of graphics
     */
    static getUploadable(displayObject, textures, graphics) {

        // Objects with textures, like Sprites
        if (displayObject._texture) {
            let texture = displayObject._texture.baseTexture;
            if (textures.indexOf(texture) == -1) {
                textures.push(texture);
            }
        } else if (displayObject instanceof PIXI.Graphics) {
            graphics.push(displayObject);
        }

        // Get timed childen
        if (displayObject instanceof PIXI.animate.MovieClip) {
            let children = displayObject.children.slice();
            displayObject._timedChildTimelines.forEach((timeline) => {
                this.getUploadable(timeline.target, textures, graphics);
                const index = children.indexOf(timeline.target);
                if (index > -1) {
                    children.splice(index, 1);
                }
            });
            children.forEach((child) => {
                this.getUploadable(child, textures, graphics);
            });
        }
        // Recursively get textures
        else if (displayObject instanceof PIXI.Container) {
            displayObject.children.forEach((child) => {
                this.getUploadable(child, textures, graphics);
            });
        }
    }
}