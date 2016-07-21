const pool = [];

/**
 * Represents a single animation play.
 * @class AnimatorTimeline
 * @namespace PIXI.animate
 */
class AnimatorTimeline {
    constructor() {
        this._update = this.update.bind(this);
        this.init(null, 0, 0, false, null);
    }

    /**
     * The pool of timelines to use
     * @method init
     * @param {PIXI.animate.MovieClip} instance
     * @param {Number} start
     * @param {Number} end
     * @param {Boolean} loop
     * @param {Function} callback
     * @private
     */
    init(instance, start, end, loop, callback) {
        this.instance = instance;
        this.loop = loop;
        this.start = start;
        this.end = end;
        this.callback = callback;

        if (instance) {
            instance.gotoAndStop(start);
            instance.beforeUpdateTimeline = this._update;
        }
    }

    /**
     * Don't use after this
     * @method destroy
     * @private
     */
    destroy() {
        this.instance.beforeUpdateTimeline = null;
        this.init(null, 0, 0, false, null);
        AnimatorTimeline._pool.push(this);
    }

    /**
     * Is the animation complete
     * @method before
     * @return {Boolean} 
     * @private
     */
    update(instance) {
        if (instance.currentFrame >= this.end) {

            // In case we over-shoot the current frame becuase of low FPS
            instance.currentFrame = this.end;

            if (this.loop) {
                // Update timeline so we get actions at the end frame
                instance._updateTimeline();
                instance.gotoAndPlay(this.start);
            } else {
                instance.stop();
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
     * @param {Number} start
     * @param {Number} end
     * @param {Boolean} loop
     * @param {Function} callback
     * @return {PIXI.animate.AnimatorTimeline}
     */
    static create(instance, start, end, loop, callback) {
        var timeline;
        if (this._pool.length) {
            timeline = this._pool.pop();
        } else {
            timeline = new AnimatorTimeline();
        }
        timeline.init(instance, start, end, loop, callback);
        return timeline;
    }
}

module.exports = AnimatorTimeline;