import AnimatorTimeline from './AnimatorTimeline';
const SharedTicker = PIXI.ticker.shared;

const timelines = [];

/**
 * Play animation via start/stop frame labels
 * @class Animator
 * @namespace PIXI.animate
 */
class Animator {

    /**
     * The collection of timelines
     * @property {Array<PIXI.animate.AnimatorTimeline>} _timelines
     * @private
     * @static
     */
    static get _timelines() {
        return timelines;
    }

    /**
     * Suffix added to label for a stop.
     * @property {String} STOP_LABEL
     * @static
     * @default "_stop"
     */
    static get STOP_LABEL() {
        return "_stop";
    }

    /**
     * Suffix added to label for a loop.
     * @property {String} LOOP_LABEL
     * @static
     * @default "_loop"
     */
    static get LOOP_LABEL() {
        return "_loop";
    }

    /**
     * Play an animation by
     * @method play
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     * @param {String} event The frame label event to call
     * @param {Function} [callback] Optional callback when complete
     * @return {PIXI.animate.AnimatorTimeline} Timeline object for stopping or getting progress.
     */
    static play(instance, event, callback) {
        var startLabel, endLabel, loop = false;

        for (var i = 0, len = instance.labels.length; i < len; i++) {
            var label = instance.labels[i];
            if (label.label === event) {
                startLabel = label;
            } else if (label.label === event + this.STOP_LABEL) {
                endLabel = label;
            } else if (label.label === event + this.LOOP_LABEL) {
                loop = true;
                endLabel = label;
            }

            if (startLabel && endLabel) {
                break;
            }
        }

        if (!startLabel) {
            throw new Error("No start label matching '" + event + "'");
        } else if (!endLabel) {
            throw new Error("No end label matching '" + event + "'");
        }

        // Stop any animation that's playing
        this.stop(instance);

        // Add a new timeline
        const timeline = AnimatorTimeline.create(
            instance,
            loop,
            startLabel.position,
            endLabel.position,
            callback
        );
        this._timelines.push(timeline);

        // Set the current frame
        if (instance.currentFrame !== startLabel.position) {
            instance.gotoAndPlay(event);
        } else {
            instance.play();
        }
        this._refresh();

        return timeline;
    }

    /**
     * Stop the animation
     * @method stop
     * @static
     * @param {PIXI.animate.MovieClip} instance Movie clip to play.
     */
    static stop(instance) {
        for (var i = 0, len = this._timelines.length; i < len; i++) {
            var timeline = this._timelines[i];
            if (timeline.instance === instance) {
                this._internalStop(timeline);
                break;
            }
        }
    }

    /**
     * Stop the animation
     * @method _internalStop
     * @private
     * @static
     * @param {PIXI.animate.AnimatorTimeline} timeline Timeline to stop.
     */
    static _internalStop(timeline) {
        this._timelines.splice(this._timelines.indexOf(timeline), 1);
        timeline.instance.stop();
        timeline.destroy();
        this._refresh();
    }

    /**
     * Refresh if we should be updating
     * @method _refresh
     * @private
     * @static
     */
    static _refresh() {
        if (this._updateBind) {
            SharedTicker.remove(this._updateBind);
        }
        this._updateBind = this._update.bind(this);
        if (this._timelines.length > 0) {
            SharedTicker.add(this._updateBind);
        }
    }

    /**
     * Update the animation
     * @method _update
     * @static
     * @private
     */
    static _update() {
        for (var i = this._timelines.length - 1; i >= 0; i--) {
            this._timelines[i].update();
        }
    }
}

module.exports = Animator;