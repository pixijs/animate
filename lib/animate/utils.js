'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// If the movieclip plugin is installed
var _prepare = null;

/**
 * @namespace PIXI.animate.utils
 * @description For keyframe conversions
 */

var AnimateUtils = function () {
    function AnimateUtils() {
        _classCallCheck(this, AnimateUtils);
    }

    /**
     * Convert the Hexidecimal string (e.g., "#fff") to uint
     * @static
     * @method PIXI.animate.utils.hexToUint
     */
    AnimateUtils.hexToUint = function hexToUint(hex) {
        // Remove the hash
        hex = hex.substr(1);

        // Convert shortcolors fc9 to ffcc99
        if (hex.length === 3) {
            hex = hex.replace(/([a-f0-9])/g, '$1$1');
        }
        return parseInt(hex, 16);
    };

    /** 
     * Fill frames with booleans of true (showing) and false (hidden).
     * @static
     * @method PIXI.animate.utils.fillFrames
     * @param {Array<Boolean>} timeline
     * @param {int} startFrame The start frame when the timeline shows up
     * @param {int} duration The length of showing
     */


    AnimateUtils.fillFrames = function fillFrames(timeline, startFrame, duration) {
        //ensure that the timeline is long enough
        var oldLength = timeline.length;
        if (oldLength < startFrame + duration) {
            timeline.length = startFrame + duration;
            //fill any gaps with false to denote that the child should be removed for a bit
            if (oldLength < startFrame) {
                //if the browser has implemented the ES6 fill() function, use that
                if (timeline.fill) {
                    timeline.fill(false, oldLength, startFrame);
                } else {
                    //if we can't use fill, then do a for loop to fill it
                    for (var i = oldLength; i < startFrame; ++i) {
                        timeline[i] = false;
                    }
                }
            }
        }
        //if the browser has implemented the ES6 fill() function, use that
        if (timeline.fill) {
            timeline.fill(true, startFrame, startFrame + duration);
        } else {
            var length = timeline.length;
            //if we can't use fill, then do a for loop to fill it
            for (var _i = startFrame; _i < length; ++_i) {
                timeline[_i] = true;
            }
        }
    };

    /**
     * Convert serialized array into keyframes
     * `"0x100y100 1x150"` to: `{ "0": {"x":100, "y": 100}, "1": {"x": 150} }`
     * @static
     * @method PIXI.animate.utils.deserializeKeyframes
     * @param {String} keyframes
     * @param {Object} Resulting keyframes
     */


    AnimateUtils.deserializeKeyframes = function deserializeKeyframes(keyframes) {
        var result = {};
        var i = 0;
        var keysMap = {
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
        var c = void 0,
            buffer = '',
            isFrameStarted = false,
            prop = void 0,
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
    };

    /**
     * Convert serialized shapes into draw commands for PIXI.Graphics.
     * @static
     * @method PIXI.animate.utils.deserializeShapes
     * @param {String} str
     * @param {Array} Resulting shapes map
     */


    AnimateUtils.deserializeShapes = function deserializeShapes(str) {
        var result = [];
        // each shape is a new line
        var shapes = str.split("\n");
        var isCommand = /^[a-z]{1,2}$/;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i].split(' '); // arguments are space separated
            for (var j = 0; j < shape.length; j++) {
                // Convert all numbers to floats, ignore colors
                var arg = shape[j];
                if (arg[0] !== '#' && !isCommand.test(arg)) {
                    shape[j] = parseFloat(arg);
                }
            }
            result.push(shape);
        }
        return result;
    };

    /** 
     * Parse the value of the compressed keyframe.
     * @method PIXI.animate.utils.parseValue
     * @static
     * @private
     * @param {String} prop The property key
     * @param {String} buffer The contents
     * @return {*} The parsed value
     */


    AnimateUtils.parseValue = function parseValue(prop, buffer) {
        switch (prop) {
            // Color transforms are parsed as an array
            case 'c':
                {
                    buffer = buffer.split(',');
                    buffer.forEach(function (val, i, buffer) {
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
    };

    /** 
     * Upload all the textures and graphics to the GPU. 
     * @method PIXI.animate.utils.upload
     * @static
     * @param {PIXI.WebGLRenderer} renderer Render to upload to
     * @param {PIXI.DisplayObject} clip MovieClip to upload
     * @param {function} done When complete
     */


    AnimateUtils.upload = function upload(renderer, displayObject, done) {
        if (!_prepare) {
            _prepare = renderer.plugins.prepare;
            _prepare.register(this.addMovieClips);
        }
        _prepare.upload(displayObject, done);
    };

    /**
     * Add movie clips to the upload prepare.
     * @method PIXI.animate.utils.addMovieClips
     * @static
     * @private
     * @param {*} item To add to the queue 
     */


    AnimateUtils.addMovieClips = function addMovieClips(item) {
        if (item instanceof PIXI.animate.MovieClip) {
            item._timedChildTimelines.forEach(function (timeline) {
                var index = item.children.indexOf(timeline.target);
                if (index === -1) {
                    _prepare.add(timeline.target);
                }
            });
            return true;
        }
        return false;
    };

    return AnimateUtils;
}();

exports.default = AnimateUtils;
//# sourceMappingURL=utils.js.map