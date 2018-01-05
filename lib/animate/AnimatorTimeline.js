"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pool = [];

/**
 * Represents a single animation play.
 * @class AnimatorTimeline
 * @memberof PIXI.animate
 */

var AnimatorTimeline = function () {
    function AnimatorTimeline() {
        _classCallCheck(this, AnimatorTimeline);

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


    AnimatorTimeline.prototype.init = function init(instance, start, end, loop, callback) {

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
            instance.gotoAndStop(start);
            instance._beforeUpdate = this._update;
        }
    };

    /**
     * Don't use after this
     * @method PIXI.animate.AnimatorTimeline#destroy
     * @private
     */


    AnimatorTimeline.prototype.destroy = function destroy() {
        this.instance._beforeUpdate = null;
        this.init(null, 0, 0, false, null);
        AnimatorTimeline._pool.push(this);
    };

    /**
     * Is the animation complete
     * @method PIXI.animate.AnimatorTimeline#update
     * @param {PIXI.animate.MovieClip} instance
     * @return {Function} Callback to do after updateTimeline
     * @private
     */


    AnimatorTimeline.prototype.update = function update(instance) {
        var completed = void 0;
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
    };

    /**
     * Stop the animation, cannot be reused.
     * @method PIXI.animate.AnimatorTimeline#stop
     */


    AnimatorTimeline.prototype.stop = function stop() {
        PIXI.animate.Animator._internalStop(this);
    };

    /**
     * The progress from 0 to 1 of the playback.
     * @name PIXI.animate.AnimatorTimeline#progress
     * @type {Number}
     * @readOnly
     */


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
    AnimatorTimeline.create = function create(instance, start, end, loop, callback) {
        var timeline;
        if (this._pool.length) {
            timeline = this._pool.pop();
        } else {
            timeline = new AnimatorTimeline();
        }
        timeline.init(instance, start, end, loop, callback);
        return timeline;
    };

    _createClass(AnimatorTimeline, [{
        key: "progress",
        get: function get() {
            var progress = (this.instance.currentFrame - this.start) / (this.end - this.start);
            return Math.max(0, Math.min(1, progress)); // clamp
        }

        /**
         * The pool of timelines to use
         * @name PIXI.animate.AnimatorTimeline._pool
         * @type {Array<PIXI.animate.AnimatorTimeline>}
         * @static
         * @private
         */

    }], [{
        key: "_pool",
        get: function get() {
            return pool;
        }
    }]);

    return AnimatorTimeline;
}();

module.exports = AnimatorTimeline;
//# sourceMappingURL=AnimatorTimeline.js.map