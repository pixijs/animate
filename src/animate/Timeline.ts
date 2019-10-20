import {Tween, TweenProps, EaseMethod} from './Tween';
import {MovieClip} from './MovieClip';

/**
 * The Timeline class represents a
 * @memberof PIXI.animate
 * @class Timeline
 * @param {PIXI.DisplayObject} Target The target for this string of tweens.
 * @extends Array
 * @constructor
 */
export class Timeline extends Array<Tween> {
    /**
     * The target DisplayObject.
     */
    public target:MovieClip;
    /**
     * Current properties in the tween, to make building the timeline more
     * efficient.
     */
    private _currentProps:TweenProps;
    constructor(target:MovieClip) {
        super();
        this.target = target;
        this._currentProps = {};
    }

    /**
     * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the normal ticking system)
     * and managed by this timeline. Adding a tween to multiple timelines will result in unexpected behaviour.
     * @method PIXI.animate.Timeline#addTween
     * @param tween The tween(s) to add. Accepts multiple arguments.
     * @return Tween The first tween that was passed in.
     */
    public addTween(properties:TweenProps, startFrame:number, duration:number, ease?:EaseMethod) {
        this.extendLastFrame(startFrame - 1);
        //ownership of startProps is passed to the new Tween - this object should not be reused
        let startProps:TweenProps = {};
        //figure out what the starting values for this tween should be
        for (const prop in properties) {
            //if we have already set that property in an earlier tween, use the ending value
            if (this._currentProps.hasOwnProperty(prop)) {
                startProps[prop as keyof TweenProps] = this._currentProps[prop as keyof TweenProps];
            }
            //otherwise, get the current value
            else {
                let startValue = startProps[prop as keyof TweenProps] = this.getPropFromShorthand(prop as keyof TweenProps);
                //go through previous tweens to set the value so that when the timeline loops
                //around, the values are set properly - having each tween know what came before
                //allows us to set to a specific frame without running through the entire timeline
                for (let i = this.length - 1; i >= 0; --i) {
                    this[i].startProps[prop as keyof TweenProps] = startValue;
                    this[i].endProps[prop as keyof TweenProps] = startValue;
                }
            }
        }
        //create the new Tween and add it to the list
        let tween = new Tween(this.target, startProps, properties, startFrame, duration, ease);
        this.push(tween);
        //update starting values for the next tween - if tweened values included 'p', then Tween
        //parsed that to add additional data that is required
        Object.assign(this._currentProps, tween.endProps);
    }

    /**
     * Add a single keyframe that doesn't tween.
     * @method PIXI.animate.Timeline#addKeyframe
     * @param {Object} properties The properties to set.
     * @param {int} startFrame The starting frame index.
     */
    public addKeyframe(properties:TweenProps, startFrame:number) {
        this.extendLastFrame(startFrame - 1);
        let startProps = Object.assign({}, this._currentProps, properties);
        //create the new Tween and add it to the list
        let tween = new Tween(this.target, startProps, null, startFrame, 0);
        this.push(tween);
        Object.assign(this._currentProps, tween.endProps);
    }

    /**
     * Extend the last frame of the tween.
     * @method PIXI.animate.Timeline#extendLastFrame
     * @param {int} endFrame The ending frame index.
     */
    public extendLastFrame(endFrame:number) {
        if (this.length) {
            let prevTween = this[this.length - 1];
            if (prevTween.endFrame < endFrame) {
                if (prevTween.isTweenlessFrame) {
                    prevTween.endFrame = endFrame;
                } else {
                    this.addKeyframe(
                        this._currentProps,
                        prevTween.endFrame + 1,
                        // endFrame - prevTween.endFrame + 1
                    );
                }
            }
        }
    }

    /**
     * Get the value for a property
     * @method PIXI.animate.Timeline#getPropFromShorthand
     * @param {string} prop
     */
    private getPropFromShorthand<P extends keyof TweenProps>(prop:P):TweenProps[P] {
        const target = this.target;
        switch (prop) {
            case 'x':
                return target.position.x;
            case 'y':
                return target.position.y;
            case 'sx':
                return target.scale.x;
            case 'sy':
                return target.scale.y;
            case 'kx':
                return target.skew.x;
            case 'ky':
                return target.skew.y;
            case 'r':
                return target.rotation;
            case 'a':
                return target.alpha;
            case 'v':
                return target.visible;
            case 'm':
                return target.mask;
                // case 't':
                //   return target.tint;
                //not sure if we'll actually handle graphics this way?
                //g: return null;
        }
        return null;
    }
}