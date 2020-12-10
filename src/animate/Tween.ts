import { AnimateDisplayObject } from './DisplayObject';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';

export type EaseMethod = (input: number) => number;

// NOTE ABOUT KEYS OF TweenProps: Use "(myProps[key] as any) = myVal;"
// Typescript is unhelpful in this case: https://github.com/microsoft/TypeScript/issues/31663
export interface TweenProps {
    x?: number;
    y?: number;
    sx?: number;
    sy?: number;
    kx?: number;
    ky?: number;
    r?: number;
    a?: number;
    t?: number;
    v?: boolean;
    c?: number[];
    m?: Graphics|Sprite;
    g?: any;
}

// standard tweening
function lerpValue(start: number, end: number, t: number): number
{
    return start + ((end - start) * t);
}

const PI = Math.PI;
const TWO_PI = PI * 2;

// handle 355 -> 5 degrees only going through a 10 degree change instead of
// the long way around
// Math from http://stackoverflow.com/a/2708740
function lerpRotation(start: number, end: number, t: number): number
{
    const difference = Math.abs(end - start);

    if (difference > PI)
    {
        // We need to add on to one of the values.
        if (end > start)
        {
            // We'll add it on to start...
            start += TWO_PI;
        }
        else
        {
            // Add it on to end.
            end += PI + TWO_PI;
        }
    }

    // Interpolate it.
    const value = (start + ((end - start) * t));

    // wrap to 0-2PI
    /* if (value >= 0 && value <= TWO_PI)
        return value;
    return value % TWO_PI;*/

    // just return, as it's faster
    return value;
}

// split r, g, b into separate values for tweening
/* function lerpColor(start, end, t)
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

const PROP_LERPS: {[P in keyof TweenProps]: (start: number, end: number, t: number) => number} = {
    // position
    x: lerpValue,
    y: lerpValue,
    // scale
    sx: lerpValue,
    sy: lerpValue,
    // skew
    kx: lerpValue,
    ky: lerpValue,
    // rotation
    r: lerpRotation,
    // alpha
    a: lerpValue,
    // tinting
    // t: lerpColor,
    t: null,
    // values to be set
    v: null, // visible
    c: null, // colorTransform
    m: null, // mask
    g: null, // not sure if we'll actually handle graphics this way?
};

function setPropFromShorthand(target: AnimateDisplayObject, prop: keyof TweenProps, value: any): void
{
    switch (prop)
    {
        case 'x':
            target.transform.position.x = value;
            break;
        case 'y':
            target.transform.position.y = value;
            break;
        case 'sx':
            target.transform.scale.x = value;
            break;
        case 'sy':
            target.transform.scale.y = value;
            break;
        case 'kx':
            target.transform.skew.x = value;
            break;
        case 'ky':
            target.transform.skew.y = value;
            break;
        case 'r':
            target.transform.rotation = value;
            break;
        case 'a':
            target.alpha = value;
            break;
        case 't':
            target.i(value); // i = setTint
            break;
        case 'c':
            target.setColorTransform(...value as [number, number, number, number, number, number]); // c = setColorTransform
            break;
        case 'v':
            target.visible = value;
            break;
        case 'm':
            target.ma(value); // ma = setMask
            break;
    }
}

/**
 * Provides timeline playback of movieclip
 */
export class Tween
{
    /**
     * Target display object.
     */
    public target: AnimateDisplayObject;
    /**
     * Properties at the start of the tween
     */
    public startProps: TweenProps;
    /**
     * Properties at the end of the tween, as well as any properties that are set
     * instead of tweened
     */
    public endProps: TweenProps;
    /**
     * duration of tween in frames. For a keyframe with no tweening, the duration will be 0.
     */
    public duration: number;
    /**
     * The frame that the tween starts on
     */
    public startFrame: number;
    /**
     * the frame that the tween ends on
     */
    public endFrame: number;
    /**
     * easing function to use, if any
     */
    public ease: EaseMethod;
    /**
     * If we don't tween.
     */
    public isTweenlessFrame: boolean;

    /**
     * @param target The target to play
     * @param startProps The starting properties
     * @param endProps The ending properties
     * @param startFrame frame number on which to begin tweening
     * @param duration Number of frames to tween
     * @param ease Ease function to use
     */
    constructor(target: AnimateDisplayObject,
        startProps: TweenProps,
        endProps: TweenProps|null,
        startFrame: number,
        duration: number,
        ease?: EaseMethod)
    {
        this.target = target;
        this.startProps = startProps;
        this.endProps = {};
        this.duration = duration;
        this.startFrame = startFrame;
        this.endFrame = startFrame + duration;
        this.ease = ease;
        this.isTweenlessFrame = !endProps;

        if (endProps)
        {
            // make a copy to safely include any unchanged values from the start of the tween
            for (const prop in endProps)
            {
                (this.endProps[prop as keyof TweenProps] as any) = endProps[prop as keyof TweenProps];
            }
        }

        // copy in any starting properties don't change
        for (const prop in startProps)
        {
            // eslint-disable-next-line no-prototype-builtins
            if (!this.endProps.hasOwnProperty(prop))
            {
                (this.endProps[prop as keyof TweenProps] as any) = startProps[prop as keyof TweenProps];
            }
        }
    }

    /**
     * Set the current frame.
     */
    public setPosition(currentFrame: number): void
    {
        // if this is a single frame with no tweening, or at the end of the tween, then
        // just speed up the process by setting values
        if (currentFrame >= this.endFrame)
        {
            this.setToEnd();

            return;
        }

        if (this.isTweenlessFrame)
        {
            this.setToEnd();

            return;
        }

        let time = (currentFrame - this.startFrame) / this.duration;

        if (this.ease)
        {
            time = this.ease(time);
        }
        const target = this.target;
        const startProps = this.startProps;
        const endProps = this.endProps;

        for (const prop in endProps)
        {
            const p = prop as keyof TweenProps;
            const lerp = PROP_LERPS[p];

            if (lerp)
            {
                setPropFromShorthand(target, p, lerp(startProps[p], endProps[p], time));
            }
            else
            {
                setPropFromShorthand(target, p, startProps[p]);
            }
        }
    }

    /**
     * Set to the end position
     */
    setToEnd(): void
    {
        const endProps = this.endProps;
        const target = this.target;

        for (const prop in endProps)
        {
            setPropFromShorthand(target, prop as keyof TweenProps, endProps[prop as keyof TweenProps]);
        }
    }
}
