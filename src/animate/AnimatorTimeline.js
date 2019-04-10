const pool = [];

/**
 * Represents a single animation play.
 * @class AnimatorTimeline
 * @memberof PIXI.animate
 */
class AnimatorTimeline {
    constructor() {
        this._update = this.update.bind(this);
        this.init(null, 0, 0, false, null);
    }

    /**
     * The pool of timelines to use
     * @method PIXI.animate.AnimatorTimeline#init
     * @param {PIXI.animate.MovieClip} instance
     * @param {Number} start
     * @param {Number} end
     * @param {Boolean} loop
     * @param {Function} callback
     * @private
     */
    init(instance, start, end, loop, callback) {

        /**
         * Instance of clip to play.
         * @name PIXI.animate.AnimatorTimeline#instance
         * @type {PIXI.animate.MovieClip}
         * @readOnly
         */
        this.instance = instance;

        /**
         * `true` if the timeline is suppose to loop.
         * @name PIXI.animate.AnimatorTimeline#loop
         * @type {Boolean}
         * @readOnly
         */
        this.loop = loop;

        /**
         * Frame number of the starting farme.
         * @name PIXI.animate.AnimatorTimeline#start
         * @type {int}
         * @readOnly
         */
        this.start = start;

        /**
         * Frame number of the ending frame.
         * @name PIXI.animate.AnimatorTimeline#end
         * @type {int}
         * @readOnly
         */
        this.end = end;

        /**
         * Callback called when completed (non-looping animation).
         * @name PIXI.animate.AnimatorTimeline#callback
         * @type {Function}
         * @readOnly
         */
        this.callback = callback; 

        if (instance) {
            //Prevent overshooting the end frame and looping back around:
            instance.loop = false;
            instance.gotoAndStop(start);
            instance._beforeUpdate = this._update;
        }
    }

    /**
     * Don't use after this
     * @method PIXI.animate.AnimatorTimeline#destroy
     * @private
     */
    destroy() {
        this.instance._beforeUpdate = null;
        this.init(null, 0, 0, false, null);
        AnimatorTimeline._pool.push(this);
    }

    /**
     * Is the animation complete
     * @method PIXI.animate.AnimatorTimeline#update
     * @param {PIXI.animate.MovieClip} instance
     * @return {Function} Callback to do after updateTimeline
     * @private
     */
    update(instance) {
        let completed;
        if (instance.currentFrame >= this.end) {

            // In case we over-shoot the current frame becuase of low FPS
            instance.currentFrame = this.end;

            if (this.loop) {
                // Update timeline so we get actions at the end frame
                instance._updateTimeline();
                instance.gotoAndPlay(this.start);
            } else {
                instance.stop();
                if (this.callback) {
                    completed = this.callback;
                }
                this.stop(); // cleanup timeline
            }
        }
        return completed;
    }

    /**
     * Stop the animation, cannot be reused.
     * @method PIXI.animate.AnimatorTimeline#stop
     */
    stop() {
        PIXI.animate.Animator._internalStop(this);
    }

    /**
     * The progress from 0 to 1 of the playback.
     * @name PIXI.animate.AnimatorTimeline#progress
     * @type {Number}
     * @readOnly
     */
    get progress() {
        const progress = (this.instance.currentFrame - this.start) / (this.end - this.start);
        return Math.max(0, Math.min(1, progress)); // clamp
    }

    /**
     * The pool of timelines to use
     * @name PIXI.animate.AnimatorTimeline._pool
     * @type {Array<PIXI.animate.AnimatorTimeline>}
     * @static
     * @private
     */
    static get _pool() {
        return pool;
    }

    /**
     * Create a new timeline
     * @method PIXI.animate.AnimatorTimeline.create
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