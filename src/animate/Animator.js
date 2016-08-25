import AnimatorTimeline from './AnimatorTimeline';

// Static collection of timelines
const timelines = [];

/**
 * Play animation via start/stop frame labels
 * @class Animator
 * @memberof PIXI.animate
 */
class Animator {

    /**
     * The collection of timelines
     * @name {Array<PIXI.animate.AnimatorTimeline>} PIXI.animate.Animator#_timelines
     * @private
     * @static
     */
    static get _timelines() {
        return timelines;
    }

    /**
     * Suffix added to label for a stop.
     * @name {String} PIXI.animate.Animator.STOP_LABEL
     * @static
     * @default "_stop"
     */
    static get STOP_LABEL() {
        return "_stop";
    }

    /**
     * Suffix added to label for a loop.
     * @name {String} PIXI.animate.Animator.LOOP_LABEL
     * @static
     * @default "_loop"
     */
    static get LOOP_LABEL() {
        return "_loop";
    }

    /**
     * Play an animation by frame labels. For instance, play animation sequence from
     * "idle" to "idle_stop" or "idle_loop". If no event label is provided, will
     * play the entire duration of the MovieClip.
     * @method PIXI.animate.Animator#play
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     * @param {String|Function} [label] The frame label event to call, if no event is provided
     *        will use the entire length of the MovieClip. Can also be the callback.
     * @param {Function} [callback] Optional callback when complete
     * @return {PIXI.animate.AnimatorTimeline} Timeline object for stopping or getting progress.
     */
    static play(instance, label, callback) {
        let loop = false;
        let start, end;
        const labelIsFunction = typeof label === "function";
        if (label === undefined || labelIsFunction) {
            start = 0;
            end = instance.totalFrames - 1;
            if (labelIsFunction) {
                callback = label;
            }
        } else {
            start = instance.labelsMap[label];
            end = instance.labelsMap[label + this.STOP_LABEL];
            if (end === undefined) {
                end = instance.labelsMap[label + this.LOOP_LABEL];
                loop = true;
            }
            if (start === undefined) {
                throw new Error("No start label matching '" + label + "'");
            } else if (end === undefined) {
                throw new Error("No end label matching '" + label + "'");
            }
        }
        return this.fromTo(
            instance,
            start,
            end,
            loop,
            callback
        );
    }

    /**
     * Play an animation from the current frame to an end frame or label.
     * @method PIXI.animate.Animator#to
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     * @param {String|Number} end The end frame or label.
     * @param {Function} [callback] Optional callback when complete
     * @return {PIXI.animate.AnimatorTimeline} Timeline object for stopping or getting progress.
     */
    static to(instance, end, callback) {
        return this.fromTo(
            instance,
            instance.currentFrame,
            end,
            false,
            callback
        );
    }

    /**
     * Play a MovieClip from a start to end frame.
     * @method PIXI.animate.Animator#fromTo
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     * @param {Number|String} start The starting frame index or label.
     * @param {Number|String} end The ending frame index or label.
     * @param {Boolean} [loop=false] If the animation should loop.
     * @param {Function} [callback] Optional callback when complete
     * @return {PIXI.animate.AnimatorTimeline} Timeline object for stopping or getting progress.
     */
    static fromTo(instance, start, end, loop, callback) {

        if (typeof start === "string") {
            const startLabel = start;
            start = instance.labelsMap[startLabel];
            if (start === undefined) {
                throw new Error("No start label matching '" + startLabel + "'");
            }
        }
        if (typeof end === "string") {
            const endLabel = end;
            end = instance.labelsMap[endLabel];
            if (end === undefined) {
                throw new Error("No end label matching '" + endLabel + "'");
            }
        }
        if (start < 0) {
            throw new Error('Start frame is out of bounds');
        }
        if (end >= instance.totalFrames) {
            throw new Error('End frame is out of bounds');
        }
        if (start >= end) {
            throw new Error('End frame is before start frame');
        }

        // Stop any animation that's playing
        this.stop(instance);

        loop = !!loop;

        // Add a new timeline
        const timeline = AnimatorTimeline.create(
            instance,
            start,
            end,
            loop,
            callback
        );
        this._timelines.push(timeline);

        // Set the current frame
        if (instance.currentFrame !== start) {
            instance.gotoAndPlay(start);
        } else {
            instance.play();
        }
        return timeline;
    }

    /**
     * Stop the animation by instance.
     * @method PIXI.animate.Animator#stop
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     */
    static stop(instance) {
        for (let i = 0, len = this._timelines.length; i < len; i++) {
            const timeline = this._timelines[i];
            if (timeline.instance === instance) {
                this._internalStop(timeline);
                break;
            }
        }
    }

    /**
     * Stop all the currently playing animations.
     * @method PIXI.animate.Animator#stopAll
     * @static
     */
    static stopAll() {
        for (let i = this._timelines.length - 1; i >= 0; i--) {
            this._internalStop(this._timelines[i]);
        }
    }

    /**
     * Stop the animation
     * @method PIXI.animate.Animator#_internalStop
     * @private
     * @static
     * @param {PIXI.animate.AnimatorTimeline} timeline Timeline to stop.
     */
    static _internalStop(timeline) {
        this._timelines.splice(this._timelines.indexOf(timeline), 1);
        timeline.instance.stop();
        timeline.destroy();
    }
}

module.exports = Animator;