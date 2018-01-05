"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AnimatorTimeline = require("./AnimatorTimeline");

var _AnimatorTimeline2 = _interopRequireDefault(_AnimatorTimeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Static collection of timelines
var timelines = [];

/**
 * Play animation via start/stop frame labels
 * @class Animator
 * @memberof PIXI.animate
 */

var Animator = function () {
    function Animator() {
        _classCallCheck(this, Animator);
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
    Animator.play = function play(instance, label, callback) {
        var loop = false;
        var start = void 0,
            end = void 0;
        var labelIsFunction = typeof label === "function";
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
        return this.fromTo(instance, start, end, loop, callback);
    };

    /**
     * Play an animation from the current frame to an end frame or label.
     * @method PIXI.animate.Animator#to
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     * @param {String|Number} end The end frame or label.
     * @param {Function} [callback] Optional callback when complete
     * @return {PIXI.animate.AnimatorTimeline} Timeline object for stopping or getting progress.
     */


    Animator.to = function to(instance, end, callback) {
        return this.fromTo(instance, instance.currentFrame, end, false, callback);
    };

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


    Animator.fromTo = function fromTo(instance, start, end, loop, callback) {

        if (typeof start === "string") {
            var startLabel = start;
            start = instance.labelsMap[startLabel];
            if (start === undefined) {
                throw new Error("No start label matching '" + startLabel + "'");
            }
        }
        if (typeof end === "string") {
            var endLabel = end;
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
        var timeline = _AnimatorTimeline2.default.create(instance, start, end, loop, callback);
        this._timelines.push(timeline);

        // Set the current frame
        if (instance.currentFrame !== start) {
            instance.gotoAndPlay(start);
        } else {
            instance.play();
        }
        return timeline;
    };

    /**
     * Stop the animation by instance.
     * @method PIXI.animate.Animator#stop
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     */


    Animator.stop = function stop(instance) {
        for (var i = 0, len = this._timelines.length; i < len; i++) {
            var timeline = this._timelines[i];
            if (timeline.instance === instance) {
                this._internalStop(timeline);
                break;
            }
        }
    };

    /**
     * Stop all the currently playing animations.
     * @method PIXI.animate.Animator#stopAll
     * @static
     */


    Animator.stopAll = function stopAll() {
        for (var i = this._timelines.length - 1; i >= 0; i--) {
            this._internalStop(this._timelines[i]);
        }
    };

    /**
     * Stop the animation
     * @method PIXI.animate.Animator#_internalStop
     * @private
     * @static
     * @param {PIXI.animate.AnimatorTimeline} timeline Timeline to stop.
     */


    Animator._internalStop = function _internalStop(timeline) {
        this._timelines.splice(this._timelines.indexOf(timeline), 1);
        timeline.instance.stop();
        timeline.destroy();
    };

    _createClass(Animator, null, [{
        key: "_timelines",


        /**
         * The collection of timelines
         * @name {Array<PIXI.animate.AnimatorTimeline>} PIXI.animate.Animator#_timelines
         * @private
         * @static
         */
        get: function get() {
            return timelines;
        }

        /**
         * Suffix added to label for a stop.
         * @name {String} PIXI.animate.Animator.STOP_LABEL
         * @static
         * @default "_stop"
         */

    }, {
        key: "STOP_LABEL",
        get: function get() {
            return "_stop";
        }

        /**
         * Suffix added to label for a loop.
         * @name {String} PIXI.animate.Animator.LOOP_LABEL
         * @static
         * @default "_loop"
         */

    }, {
        key: "LOOP_LABEL",
        get: function get() {
            return "_loop";
        }
    }]);

    return Animator;
}();

module.exports = Animator;
//# sourceMappingURL=Animator.js.map