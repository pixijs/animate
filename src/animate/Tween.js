/**
 * Provide timeline playback of movieclip
 * @namespace PIXI.animate
 * @class Tween
 * @constructor
 * @param {PIXI.animate.MovieClip} target The target to play
 * @param {Object} startProps The starting properties
 * @param {Object} endProps The ending properties
 * @param {int} duration Number oframes to tween
 * @param {Function} [ease] Ease function to use
 */

class Tween {

    constructor(target, startProps, endProps, startFrame, duration, ease) {

        /**
         * target display object
         * @property {Object} target
         */
        this.target = target;

        /** 
         * properties at the start of the tween
         * @property {Object} startProps
         */
        this.startProps = startProps;

        /**
         * properties at the end of the tween, as well as any properties that are set
         * instead of tweened
         * @property {Object} endProps
         */
        this.endProps = {};

        /**
         * duration of tween in frames. For a keyframe with no tweening, the duration will be 0.
         * @property {int} duration
         */
        this.duration = duration;

        /**
         * The frame that the tween starts on
         * @property {int} startFrame
         */
        this.startFrame = startFrame;

        /**
         * the frame that the tween ends on
         * @property {int} endFrame
         */
        this.endFrame = startFrame + duration;

        /**
         * easing function to use, if any
         * @property {Function} ease
         */
        this.ease = ease;

        /**
         * If we don't tween.
         * @property {Boolean} isTweenlessFrame
         */
        this.isTweenlessFrame = !endProps;


        let prop;
        if (endProps) {
            //make a copy to safely include any unchanged values from the start of the tween
            for (prop in endProps) {
                this.endProps[prop] = endProps[prop];
            }
        }

        //copy in any starting properties don't change
        for (prop in startProps) {
            if (!this.endProps.hasOwnProperty(prop)) {
                this.endProps[prop] = startProps[prop];
            }
        }
    }

    /**
     * Set the current frame.
     * @method setPosition
     * @param {int} currentFrame
     */
    setPosition(currentFrame) {
        //if this is a single frame with no tweening, or at the end of the tween, then
        //just speed up the process by setting values
        if (currentFrame >= this.endFrame) {
            this.setToEnd();
            return;
        }

        if (this.isTweenlessFrame) {
            this.setToEnd();
            return;
        }

        let time = (currentFrame - this.startFrame) / this.duration;
        if (this.ease) {
            time = this.ease(time);
        }
        let target = this.target;
        let startProps = this.startProps;
        let endProps = this.endProps;
        for (let prop in endProps) {
            let lerp = props[prop];
            if (lerp) {
                setPropFromShorthand(target, prop, lerp(startProps[prop], endProps[prop], time));
            } else {
                setPropFromShorthand(target, prop, startProps[prop]);
            }
        }
    }

    /**
     * Set to the end position
     * @method setToEnd
     */
    setToEnd() {
        let endProps = this.endProps;
        let target = this.target;
        for (let prop in endProps) {
            setPropFromShorthand(target, prop, endProps[prop]);
        }
    }
}

//standard tweening
function lerpValue(start, end, t) {
    return start + (end - start) * t;
}

const props = {
    //position
    x: lerpValue,
    y: lerpValue,
    //scale
    sx: lerpValue,
    sy: lerpValue,
    //skew
    kx: lerpValue,
    ky: lerpValue,
    //rotation
    r: lerpRotation,
    //alpha
    a: lerpValue,
    //tinting
    // t: lerpColor,
    t: null,
    //values to be set
    v: null, //visible
    c: null, //colorTransform
    m: null, //mask
    g: null //not sure if we'll actually handle graphics this way?
};

//split r, g, b into separate values for tweening
/*function lerpColor(start, end, t)
{
    //split start color into components
    let sR = start >> 16 & 0xFF;
    let sG = start >> 8 & 0xFF;
    let sB = start & 0xFF;
    //split end color into components
    let eR = end >> 16 & 0xFF;
    let eG = end >> 8 & 0xFF;
    let eB = end & 0xFF;
    //lerp red
    let r = sR + (eR - sR) * percent;
    //clamp red to valid values
    if (r < 0)
        r = 0;
    else if (r > 255)
        r = 255;
    //lerp green
    let g = sG + (eG - sG) * percent;
    //clamp green to valid values
    if (g < 0)
        g = 0;
    else if (g > 255)
        g = 255;
    //lerp blue
    let b = sB + (eB - sB) * percent;
    //clamp blue to valid values
    if (b < 0)
        b = 0;
    else if (b > 255)
        b = 255;

    let combined = (r << 16) | (g << 8) | b;
    return combined;
}*/

const PI = Math.PI;
const TWO_PI = PI * 2;

//handle 355 -> 5 degrees only going through a 10 degree change instead of
//the long way around
//Math from http://stackoverflow.com/a/2708740
function lerpRotation(start, end, t) {
    let difference = Math.abs(end - start);
    if (difference > PI) {
        // We need to add on to one of the values.
        if (end > start) {
            // We'll add it on to start...
            start += TWO_PI;
        } else {
            // Add it on to end.
            end += PI + TWO_PI;
        }
    }

    // Interpolate it.
    let value = (start + ((end - start) * t));

    // wrap to 0-2PI
    /*if (value >= 0 && value <= TWO_PI)
        return value;
    return value % TWO_PI;*/

    //just return, as it's faster
    return value;
}

function setPropFromShorthand(target, prop, value) {
    switch (prop) {
        case "x":
            target.position.x = value;
            break;
        case "y":
            target.position.y = value;
            break;
        case "sx":
            target.scale.x = value;
            break;
        case "sy":
            target.scale.y = value;
            break;
        case "kx":
            target.skew.x = value;
            break;
        case "ky":
            target.skew.y = value;
            break;
        case "r":
            target.rotation = value;
            break;
        case "a":
            target.alpha = value;
            break;
        case "t":
            target.i(value); // i = setTint
            break;
        case "c":
            target.c.apply(target, value); // c = setColorTransform
            break;
        case "v":
            target.visible = value;
            break;
        case "m":
            target.ma(value);
            break;
    }
}

// Assign to namespace
export default Tween;