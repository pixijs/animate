import {DrawCommands} from '../mixins';
import {TweenProps} from './Tween';
import {MovieClip} from './MovieClip';
import {DisplayObject, CanvasRenderer, WebGLRenderer, prepare} from 'pixi.js';

// If the movieclip plugin is installed
let _prepare:prepare.BasePrepare<any> = null;

/**
 * @description For keyframe conversions
 */
export namespace utils {

    /**
     * Convert the Hexidecimal string (e.g., "#fff") to uint
     */
    export function hexToUint(hex:string):number {
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
     * @param timeline
     * @param startFrame The start frame when the timeline shows up
     * @param duration The length of showing
     */
    export function fillFrames(timeline:boolean[], startFrame:number, duration:number) {
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

    const keysMap:{[s:string]:keyof TweenProps} = {
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

    /**
     * Convert serialized array into keyframes
     * `"0x100y100 1x150"` to: `{ "0": {"x":100, "y": 100}, "1": {"x": 150} }`
     * @param keyframes
     * @return Resulting keyframes
     */
    export function deserializeKeyframes(keyframes:string) {
        let result:{[s:number]:TweenProps} = {};
        let i = 0;

        let buffer = '';
        let isFrameStarted = false;
        let prop:keyof TweenProps;
        let frame:TweenProps = {};

        while (i <= keyframes.length) {
            const c = keyframes[i];
            if (keysMap[c]) {
                if (!isFrameStarted) {
                    isFrameStarted = true;
                    result[buffer as any] = frame;
                }
                if (prop) {
                    (frame[prop] as any) = parseValue(prop, buffer);
                }
                prop = keysMap[c];
                buffer = '';
                i++;
            }
            // Start a new prop
            else if (!c || c === ' ') {
                i++;
                (frame[prop] as any) = parseValue(prop, buffer);
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
     * @param str
     * @param Resulting shapes map
     */
    export function deserializeShapes(str:string) {
        const result = [];
        // each shape is a new line
        let shapes = str.split("\n");
        let isCommand = /^[a-z]{1,2}$/;
        for (let i = 0; i < shapes.length; i++) {
            let shape:DrawCommands = shapes[i].split(' '); // arguments are space separated
            for (let j = 0; j < shape.length; j++) {
                // Convert all numbers to floats, ignore colors
                let arg = shape[j] as string;
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
     * @param prop The property key
     * @param buffer The contents
     * @return The parsed value
     */
    function parseValue(prop:string, buffer:string) {
        switch (prop) {
            // Color transforms are parsed as an array
            case 'c':
                {
                    const buff:(string|number)[] = buffer.split(',');
                    buff.forEach((val, i, buffer) => {
                        buffer[i] = parseFloat(val as string);
                    });
                    return buff;
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
     * Upload all the textures and graphics to the GPU.
     * @param renderer Render to upload to
     * @param clip MovieClip to upload
     * @param done When complete
     */
    export function upload(renderer:CanvasRenderer|WebGLRenderer, displayObject:DisplayObject, done:()=>void) {
        if (!_prepare) {
            _prepare = renderer.plugins.prepare;
            _prepare.registerFindHook(addMovieClips);
        }
        _prepare.upload(displayObject, done);
    }

    /**
     * Add movie clips to the upload prepare.
     * @param {*} item To add to the queue
     */
    export function addMovieClips(item:any) {
        if (item instanceof MovieClip) {
            item._timedChildTimelines.forEach((timeline) => {
                const index = item.children.indexOf(timeline.target);
                if (index === -1) {
                    _prepare.add(timeline.target);
                }
            });
            return true;
        }
        return false;
    }
}