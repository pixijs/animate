const pool = [];

/**
 * Represents a single animation play.
 * @class AnimatorTimeline
 * @namespace PIXI.animate
 */
class AnimatorTimeline {
    constructor() {
        this.init(null, null, false, 0, 0);
    }

    /**
     * The pool of timelines to use
     * @method init
     * @param {PIXI.animate.MovieClip} instance
     * @param {Boolean} loop
     * @param {Number} start
     * @param {Number} init
     * @private
     */
    init(instance, loop, start, end, callback) {
        this.instance = instance;
        this.loop = loop;
        this.start = start;
        this.end = end;
        this.callback = callback;

        if (instance) {
            instance.gotoAndStop(start);
        }
    }

    /**
     * Don't use after this
     * @method destroy
     * @private
     */
    destroy() {
        this.init(null, null, false, 0, 0, null);
        AnimatorTimeline._pool.push(this);
    }

    /**
     * Is the animation complete
     * @method update
     * @return {Boolean} 
     * @private
     */
    update() {
        if (this.instance.currentFrame >= this.end) {
            if (this.loop) {
                this.instance.gotoAndPlay(this.start);
            } else {
                var callback = this.callback;
                this.stop();
                if (callback) {
                    callback();
                }
            }
        }
    }

    /**
     * Stop the animation, cannot be reused.
     * @method stop
     */
    stop() {
        PIXI.animate.Animator._internalStop(this);
    }

    /**
     * The progress from 0 to 1 of the playback.
     * @property {Number} progress
     * @readOnly
     */
    get progress() {
        const progress = (this.instance.currentFrame - this.start) / (this.end - this.start);
        return Math.max(0, Math.min(1, progress)); // clamp
    }

    /**
     * The pool of timelines to use
     * @property {Array<AnimatorTimeline>} _pool
     * @static
     * @private
     */
    static get _pool() {
        return pool;
    }

    /**
     * Create a new timeline
     * @method create
     * @static
     * @param {PIXI.animate.MovieClip} instance
     * @param {Boolean} loop
     * @param {Number} start
     * @param {Number} init
     * @param {Function} callback
     * @return {PIXI.animate.AnimatorTimeline}
     */
    static create(instance, loop, start, end, callback) {
        var timeline;
        if (this._pool.length) {
            timeline = this._pool.pop();
        } else {
            timeline = new AnimatorTimeline();
        }
        timeline.init(instance, loop, start, end, callback);
        return timeline;
    }
}

module.exports = AnimatorTimeline;