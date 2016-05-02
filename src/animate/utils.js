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
        const result = {};
        // each shape is a new line
        let shapes = str.split("\n");
        let isCommand = /^[a-z]{1,2}$/;
        for (let i = 0; i < shapes.length; i++) {
            let shape = shapes[i].split(' '); // arguments are space separated
            let name = shape.shift(); // first argument is the ID
            for (let j = 0; j < shape.length; j++) {
                // Convert all numbers to floats, ignore colors
                let arg = shape[j];
                if (arg[0] !== '#' && !isCommand.test(arg)) {
                    shape[j] = parseFloat(arg);
                }
            }
            result[name] = shape;
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
}