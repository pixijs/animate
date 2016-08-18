import Timeline from './Timeline';
import utils from './utils';

const Container = PIXI.Container;
const SharedTicker = PIXI.ticker.shared;

/**
 * Provide timeline playback of movieclip
 * @namespace PIXI.animate
 * @class MovieClip
 * @extends PIXI.Container
 * @constructor
 * @param {Object|int} [options] The options object or the mode to play
 * @param {int} [options.mode=0] The playback mode default is independent (0),
 * @param {int} [options.startPosition=0] The starting frame
 * @param {Boolean} [options.loop=true] If playback is looped
 * @param {Object} [options.labels] The frame labels map of label to frames
 * @param {int} [options.duration] The duration, if no duration is provided, auto determines length
 * @param {int} [options.framerate=24] The framerate to use for independent mode
 */
class MovieClip extends Container {
    constructor(options, duration, loop, framerate, labels) {
        super();

        // Default options
        options = options === undefined ? {} : options;

        // Options can also be the mode
        if (typeof options === 'number') {
            options = {
                mode: options || MovieClip.INDEPENDENT,
                duration: duration || 0,
                loop: loop === undefined ? true : loop,
                labels: labels || {},
                framerate: framerate || 0,
                startPosition: 0
            };
        } else {
            // Apply defaults to options
            options = Object.assign({
                mode: MovieClip.INDEPENDENT,
                startPosition: 0,
                loop: true,
                labels: {},
                duration: 0,
                framerate: 0
            }, options);
        }

        /**
         * Controls how this MovieClip advances its time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
         * See each constant for a description of the behaviour.
         * @property mode
         * @type int
         * @default null
         */
        this.mode = options.mode;

        /**
         * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
         * @property startPosition
         * @type Number
         * @default 0
         */
        this.startPosition = options.startPosition;

        /**
         * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
         * @property loop
         * @type Boolean
         * @default true
         */
        this.loop = !!options.loop;

        /**
         * The current frame of the movieclip.
         * @property currentFrame
         * @type Number
         * @default 0
         * @readOnly
         */
        this.currentFrame = 0;

        /**
         * The collection of private labels
         * @property _labels
         * @type Array
         * @private
         */
        this._labels = [];

        /**
         * The collection of private labels
         * @property _labelDict
         * @type Object
         * @private
         */
        this._labelDict = options.labels;
        if (options.labels) {
            for (let name in options.labels) {
                let label = {
                    label: name,
                    position: options.labels[name]
                };
                this._labels.push(label);
            }
            this._labels.sort(function(a, b) {
                return a.position - b.position;
            });
        }

        /**
         * If true, this movieclip will animate automatically whenever it is on the stage.
         * @property selfAdvance
         * @type Boolean
         * @default true
         */
        this.selfAdvance = true;

        /**
         * If true, the MovieClip's position will not advance when ticked.
         * @property paused
         * @type Boolean
         * @default false
         */
        this.paused = false;

        /**
         * If true, actions in this MovieClip's tweens will be run when the playhead advances.
         * @property actionsEnabled
         * @type Boolean
         * @default true
         */
        this.actionsEnabled = true;

        /**
         * If true, the MovieClip will automatically be reset to its first frame whenever the timeline adds
         * it back onto the display list. This only applies to MovieClip instances with mode=INDEPENDENT.
         * <br><br>
         * For example, if you had a character animation with a 'body' child MovieClip instance
         * with different costumes on each frame, you could set body.autoReset = false, so that
         * you can manually change the frame it is on, without worrying that it will be reset
         * automatically.
         * @property autoReset
         * @type Boolean
         * @default true
         */
        this.autoReset = true;

        /**
         * @property _synchOffset
         * @type Number
         * @default 0
         * @private
         */
        this._synchOffset = 0;

        /**
         * @property _prevPos
         * @type Number
         * @default -1
         * @private
         */
        this._prevPos = -1; // TODO: evaluate using a ._reset Boolean prop instead of -1.

        /**
         * Note - changed from default: When the MovieClip is framerate independent, this is the time
         * elapsed from frame 0 in seconds.
         * @property _t
         * @type Number
         * @default 0
         * @private
         */
        this._t = 0;

        /**
         * By default MovieClip instances advance one frame per tick. Specifying a framerate for the MovieClip
         * will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
         * framerate.
         *
         * @property _framerate
         * @type {Number}
         * @default 0
         */
        this._framerate = options.framerate;

        /**
         * The total time in seconds for the animation. This is changed when setting the framerate.
         * @property _duration
         * @type Number
         * @default 0
         * @private
         */
        this._duration = 0;

        /**
         * The total duration in frames for the animation.
         * @property _totalFrames
         * @type Number
         * @default 0
         * @private
         */
        this._totalFrames = options.duration;

        /**
         * Standard tween timelines for all objects. Each element in the _timelines array
         * is a Timeline object - an array of tweens for one target, in order of occurrence.
         * @property _timelines
         * @type Array
         * @protected
         */
        this._timelines = [];

        /**
         * Array of child timelines denoting if a child is actively a child of this movieclip
         * on any given frame. Each element in the _timedChildTimelines is an array with a 'target'
         * property, and is an array of boolean values indexed by frame.
         * @property _timedChildTimelines
         * @type {Array}
         * @protected
         */
        this._timedChildTimelines = [];

        /**
         * Array to depth sort timed children
         * @property _depthSorted
         * @type {Array}
         * @private
         */
        this._depthSorted = [];

        /**
         * Array of frame scripts, indexed by frame.
         * @property _actions
         * @type {Array}
         * @protected
         */
        this._actions = [];

        /**
         * Optional callback fired before timeline is updated.
         * Can be used to clamp or update the currentFrame. 
         * @property _beforeUpdate
         * @type {Function}
         * @private
         */
        this._beforeUpdate = null;

        if (this.mode === MovieClip.INDEPENDENT) {
            this._tickListener = this._tickListener.bind(this);
            this._onAdded = this._onAdded.bind(this);
            this._onRemoved = this._onRemoved.bind(this);
            this.on('added', this._onAdded);
            this.on('removed', this._onRemoved);
        }

        if (options.framerate) {
            this.framerate = options.framerate;
        }
    }

    _onAdded() {
        if (!this._framerate) {
            this.framerate = this.parentFramerate;
        }
        SharedTicker.add(this._tickListener);
    }

    _tickListener(tickerDeltaTime) {
        if (this.paused || !this.selfAdvance) {
            //see if the movieclip needs to be updated even though it isn't animating
            if (this._prevPos < 0) {
                this._goto(this.currentFrame);
            }
            return;
        }
        let seconds = tickerDeltaTime / SharedTicker.speed / PIXI.TARGET_FPMS / 1000;
        this.advance(seconds);
    }

    _onRemoved() {
        SharedTicker.remove(this._tickListener);
    }

    /**
     * Returns an array of objects with label and position (aka frame) properties, sorted by position.
     * @property labels
     * @type {Array}
     * @readonly
     */
    get labels() {
        return this._labels;
    }

    /**
     * Returns a dictionary of labels where key is the label and value is the frame.
     * @property labelsMap
     * @type {Object}
     * @readonly
     */
    get labelsMap() {
        return this._labelDict;
    }

    /**
     * Returns the name of the label on or immediately before the current frame.
     * @property currentLabel
     * @type {String}
     * @readonly
     */
    get currentLabel() {
        let labels = this._labels;
        let current = null;
        for (let i = 0, len = labels.length; i < len; ++i) {
            if (labels[i].position <= this.currentFrame) {
                current = labels[i].label;
            } else {
                break;
            }
        }
        return current;
    }

    /**
     * When the MovieClip is framerate independent, this is the time elapsed from frame 0 in seconds.
     * @property elapsedTime
     * @type Number
     * @default 0
     * @public
     */
    get elapsedTime() {
        return this._t;
    }

    set elapsedTime(value) {
        this._t = value;
    }

    /**
     * By default MovieClip instances advance one frame per tick. Specifying a framerate for the MovieClip
     * will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
     * framerate.
     *
     * For example, if a MovieClip with a framerate of 10 is placed on a Stage being updated at 40fps, then the MovieClip will
     * advance roughly one frame every 4 ticks. This will not be exact, because the time between each tick will
     * vary slightly between frames.
     *
     * This feature is dependent on the tick event object (or an object with an appropriate 'delta' property) being
     * passed into {{#crossLink 'Stage/update'}}{{/crossLink}}.
     * @property framerate
     * @type {Number}
     * @default 0
     */
    get framerate() {
        return this._framerate;
    }
    set framerate(value) {
        if (value > 0) {
            this._framerate = value;
            this._duration = value ? this._totalFrames / value : 0;
            this._t = this.currentFrame / value;
        } else {
            this._t = this._framerate = this._duration = 0;
        }
    }

    /**
     * Get the total number of frames (duration) of this MovieClip
     * @property totalFrames
     * @type {Number}
     * @default 0
     * @readOnly
     */
    get totalFrames() {
        return this._totalFrames;
    }

    /**
     * Extend the timeline to the last frame.
     * @method _autoExtend
     * @private
     * @param {int} endFrame
     */
    _autoExtend(endFrame) {
        if (this._totalFrames < endFrame) {
            this._totalFrames = endFrame;
        }
    }

    /**
     * Convert values of properties
     * @method _parseProperties
     * @private
     * @param {Object} properties
     */
    _parseProperties(properties) {
        // Convert any string colors to uints
        if (typeof properties.t === 'string') {
            properties.t = utils.hexToUint(properties.t);
        } else if (typeof properties.v === 'number') {
            properties.v = !!properties.v;
        }
    }

    /**
     * Get a timeline for a child, synced timeline.
     * @method _getChildTimeline
     * @private
     * @param {PIXI.animate.MovieClip} instance
     * @return {PIXI.animate.Timeline}
     */
    _getChildTimeline(instance) {
        for (let i = this._timelines.length - 1; i >= 0; --i) {
            if (this._timelines[i].target === instance) {
                return this._timelines[i];
            }
        }
        let timeline = new Timeline(instance);
        this._timelines.push(timeline);
        return timeline;
    }

    /**
     * Add mask or masks
     * @method addTimedMask
     * @param {PIXI.DisplayObject} instance Instance to mask
     * @param {Object} keyframes The map of frames to mask objects
     * @return {PIXI.animate.MovieClip} instance of clip for chaining
     */
    addTimedMask(instance, keyframes) {
        for (let i in keyframes) {
            this.addKeyframe(instance, {
                m: keyframes[i]
            }, parseInt(i, 10));
        }

        // Set the initial position/add
        this._setTimelinePosition(this.currentFrame, this.currentFrame, true);
        return this;
    }

    /**
     * Shortcut alias for `addTimedMask`
     * @method am
     * @param {PIXI.DisplayObject} instance Instance to mask
     * @param {Object} keyframes The map of frames to mask objects
     * @return {PIXI.animate.MovieClip} instance of clip for chaining
     */
    am(instance, keyframes) {
        return this.addTimedMask(instance, keyframes);
    }

    /**
     * Add a tween to the clip
     * @method addTween
     * @param {PIXI.DisplayObject} instance The clip to tween
     * @param {Object} properties The property or property to tween
     * @param {int} startFrame The frame to start tweening
     * @param {int} [duration=0] Number of frames to tween. If 0, then the properties are set
     *                           with no tweening.
     * @param {Function} [ease] An optional easing function that takes the tween time from 0-1.
     * @return {PIXI.animate.MovieClip}
     */
    addTween(instance, properties, startFrame, duration, ease) {

        let timeline = this._getChildTimeline(instance);
        this._parseProperties(properties);
        timeline.addTween(properties, startFrame, duration, ease);
        this._autoExtend(startFrame + duration);
        return this;
    }

    /**
     * Add a tween to the clip
     * @method addKeyframe
     * @param {PIXI.DisplayObject} instance The clip to tween
     * @param {Object} properties The property or property to tween
     * @param {int} startFrame The frame to start tweening
     * @param {int} [duration=0] Number of frames to tween. If 0, then the properties are set
     *                           with no tweening.
     * @param {Function} [ease] An optional easing function that takes the tween time from 0-1.
     * @return {PIXI.animate.MovieClip}
     */
    addKeyframe(instance, properties, startFrame) {

        let timeline = this._getChildTimeline(instance);
        this._parseProperties(properties);
        timeline.addKeyframe(properties, startFrame);
        this._autoExtend(startFrame);
        return this;
    }

    /**
     * Alias for method `addTimedChild`
     * @method at
     * @return {PIXI.animate.MovieClip}
     */
    at(instance, startFrame, duration, keyframes) {
        return this.addTimedChild(instance, startFrame, duration, keyframes);
    }

    /**
     * Add a child to show for a certain number of frames before automatic removal.
     * @method addTimedChild
     * @param {PIXI.DisplayObject} instance The clip to show
     * @param {int} startFrame The starting frame
     * @param {int} [duration=1] The number of frames to display the child before removing it.
     * @param {String|Array} [keyframes] The collection of static keyframes to add
     * @return {PIXI.animate.MovieClip}
     */
    addTimedChild(instance, startFrame, duration, keyframes) {

        if (startFrame === undefined) // jshint ignore:line
        {
            startFrame = 0;
        }
        if (duration === undefined || duration < 1) // jshint ignore:line
        {
            duration = this._totalFrames || 1;
        }

        // Add the starting offset for synced movie clips
        if (instance.mode === MovieClip.SYNCHED) {
            instance.parentStartPosition = startFrame;
        }

        //add tweening info about this child's presence on stage
        //when the child is (re)added, if it has 'autoReset' set to true, then it
        //should be set back to frame 0
        let timeline, i;
        //get existing timeline
        for (i = this._timedChildTimelines.length - 1; i >= 0; --i) {
            if (this._timedChildTimelines[i].target === instance) {
                timeline = this._timedChildTimelines[i];
                break;
            }
        }
        //if there wasn't one, make a new one
        if (!timeline) {
            timeline = [];
            timeline.target = instance;
            this._timedChildTimelines.push(timeline);
        }

        // Fill the timeline with keyframe booleans
        utils.fillFrames(timeline, startFrame, duration);

        // Update the total frames if the instance extends our current
        // total frames for this movieclip
        if (this._totalFrames < startFrame + duration) {
            this._totalFrames = startFrame + duration;
        }

        // Add the collection of keyframes
        if (keyframes) {
            if (typeof keyframes === "string") {
                keyframes = utils.deserializeKeyframes(keyframes);
            }
            // Convert the keyframes object into
            // individual properties
            let lastFrame = {};
            for (let i in keyframes) {
                lastFrame = Object.assign({}, lastFrame, keyframes[i]);
                this.addKeyframe(instance, lastFrame, parseInt(i, 10));
            }
            this._getChildTimeline(instance)
                .extendLastFrame(startFrame + duration);
        }

        // Set the initial position/add
        this._setTimelinePosition(startFrame, this.currentFrame, true);

        return this;
    }

    /**
     * Short cut for `addAction`
     * @method aa
     * @param {Function} callback The clip call on a certain frame
     * @param {int|String} startFrame The starting frame index or label
     * @return {PIXI.animate.MovieClip}
     */
    aa(callback, startFrame) {
        return this.addAction(callback, startFrame);
    }

    /**
     * Handle frame actions, callback is bound to the instance of the MovieClip.
     * @method addAction
     * @param {Function} callback The clip call on a certain frame
     * @param {int|String} startFrame The starting frame index or label
     * @return {PIXI.animate.MovieClip}
     */
    addAction(callback, startFrame) {

        if (typeof startFrame === 'string') {
            const index = this._labelDict[startFrame];
            if (index === undefined) {
                throw `The label '${startFrame}' does not exist on this timeline`;
            }
            startFrame = index;
        }

        let actions = this._actions;
        //ensure that the movieclip timeline is long enough to support the target frame
        if (actions.length <= startFrame) {
            actions.length = startFrame + 1;
        }
        if (this._totalFrames < startFrame) {
            this._totalFrames = startFrame;
        }
        //add the action
        if (actions[startFrame]) {
            actions[startFrame].push(callback);
        } else {
            actions[startFrame] = [callback];
        }
        return this;
    }

    /**
     * Sets paused to false.
     * @method play
     */
    play() {
        this.paused = false;
    }

    /**
     * Sets paused to true.
     * @method stop
     */
    stop() {
        this.paused = true;
    }

    /**
     * Advances this movie clip to the specified position or label and sets paused to false.
     * @method gotoAndPlay
     * @param {String|Number} positionOrLabel The animation name or frame number to go to.
     */
    gotoAndPlay(positionOrLabel) {
        this.paused = false;
        this._goto(positionOrLabel);
    }

    /**
     * Advances this movie clip to the specified position or label and sets paused to true.
     * @method gotoAndStop
     * @param {String|Number} positionOrLabel The animation or frame name to go to.
     */
    gotoAndStop(positionOrLabel) {
        this.paused = true;
        this._goto(positionOrLabel);
    }

    /**
     * Get the close parent with a valid framerate. If no parent, returns the default framerate.
     * @property parentFramerate
     * @type {Number}
     * @readOnly
     */
    get parentFramerate() {
        let o = this,
            fps = o._framerate;
        while ((o = o.parent) && !fps) {
            if (o.mode === MovieClip.INDEPENDENT) {
                fps = o._framerate;
            }
        }
        return fps || MovieClip.DEFAULT_FRAMERATE;
    }

    /**
     * Advances the playhead. This occurs automatically each tick by default.
     * @param [time] {Number} The amount of time in seconds to advance by. Only applicable if framerate is set.
     * @method advance
     */
    advance(time) {

        // Handle any other cases where starting to play
        // and no framerate has been set yet
        if (!this._framerate) {
            this.framerate = this.parentFramerate;
        }

        if (time) {
            this._t += time;
        }
        if (this._t > this._duration) {
            this._t = this.loop ? this._t - this._duration : this._duration;
        }
        //add a tiny amount to account for potential floating point errors
        this.currentFrame = Math.floor(this._t * this._framerate + 0.00000001);
        //final error checking
        if (this.currentFrame >= this._totalFrames) {
            this.currentFrame = this._totalFrames - 1;
        }
        let afterUpdateOnce;
        if (this._beforeUpdate) {
            afterUpdateOnce = this._beforeUpdate(this);
        }
        //update all tweens & actions in the timeline
        this._updateTimeline();

        // Do the animator callback here
        if (afterUpdateOnce) {
            afterUpdateOnce();
        }
    }

    /**
     * @method _goto
     * @param {String|Number} positionOrLabel The animation name or frame number to go to.
     * @protected
     */
    _goto(positionOrLabel) {
        let pos = typeof positionOrLabel === 'string' ? this._labelDict[positionOrLabel] : positionOrLabel;
        if (pos === undefined) // jshint ignore:line
        {
            return;
        }
        // prevent _updateTimeline from overwriting the new position because of a reset:
        this._prevPos = NaN;
        this.currentFrame = pos;

        // Handle the case where trying to play but haven't
        // added to the stage yet
        if (!this._framerate) {
            this.framerate = this.parentFramerate;
        }

        //update the elapsed time if a time based movieclip
        if (this._framerate > 0) {
            this._t = pos / this._framerate;
        } else {
            this._t = 0;
        }
        this._updateTimeline();
    }

    /**
     * @method _reset
     * @private
     */
    _reset() {
        this._prevPos = -1;
        this._t = 0;
        this.currentFrame = 0;
    }

    /**
     * @method _updateTimeline
     * @protected
     */
    _updateTimeline() {
        let synched = this.mode !== MovieClip.INDEPENDENT;

        if (synched) {
            this.currentFrame = this.startPosition + (this.mode === MovieClip.SINGLE_FRAME ? 0 : this._synchOffset);
            if (this.currentFrame >= this._totalFrames) {
                this.currentFrame %= this._totalFrames;
            }
        }

        if (this._prevPos === this.currentFrame) {
            return;
        }

        // update timeline position, ignoring actions if this is a graphic.
        this._setTimelinePosition(this._prevPos, this.currentFrame, synched ? false : this.actionsEnabled);

        this._prevPos = this.currentFrame;
    }

    /**
     * Set the timeline position
     * @method _setTimelinePostion
     * @protected
     * @param {int} startFrame
     * @param {int} currentFrame
     * @param {Boolean} doActions
     */
    _setTimelinePosition(startFrame, currentFrame, doActions) {
        //handle all tweens
        let i, j, length, _timelines = this._timelines;
        for (i = _timelines.length - 1; i >= 0; --i) {
            let timeline = _timelines[i];
            for (j = 0, length = timeline.length; j < length; ++j) {
                let tween = timeline[j];
                //if the tween contains part of the timeline that we are travelling through
                if (currentFrame >= tween.startFrame &&
                    currentFrame <= tween.endFrame) {
                    // set the position within that tween
                    //and break the loop to move onto the next timeline
                    tween.setPosition(currentFrame);
                    break;
                }
            }
        }

        let timedChildTimelines = this._timedChildTimelines;
        let depthSorted = this._depthSorted;
        for (i = 0, length = timedChildTimelines.length; i < length; ++i) {
            let target = timedChildTimelines[i].target;
            let shouldBeChild = timedChildTimelines[i][currentFrame];
            //if child should be on stage and is not:
            if (shouldBeChild) {
                // Add to the depthSorted object so we can
                // check that items are property drawn later
                depthSorted.push(target);
                if (target.parent !== this) {
                    // add the target if it's not there already
                    this.addChild(target);
                    if (target.mode === MovieClip.INDEPENDENT && target.autoReset) {
                        target._reset();
                    }
                }
            } else if (!shouldBeChild && target.parent === this) {
                this.removeChild(target);
            }
        }

        // Properly depth sort the children
        for (i = 0, length = depthSorted.length; i < length; i++) {
            let target = depthSorted[i];
            let currentIndex = this.children.indexOf(target);
            if (currentIndex !== i) {
                this.addChildAt(target, i);
            }
        }

        // Clear the temporary depth sorting array
        depthSorted.length = 0;

        //go through all children and update synched movieclips that are not single frames
        let children = this.children,
            child;
        for (i = 0, length = children.length; i < length; ++i) {
            child = children[i];
            if (child.mode === MovieClip.SYNCHED) {
                child._synchOffset = currentFrame - child.parentStartPosition;
                child._updateTimeline();
            }
        }

        //handle actions
        if (doActions) {
            let actions = this._actions;
            //handle looping around
            let needsLoop = false;
            if (currentFrame < startFrame) {
                length = actions.length;
                needsLoop = true;
            } else {
                length = Math.min(currentFrame + 1, actions.length);
            }
            for (i = startFrame >= 0 ? startFrame + 1 : currentFrame; i < length; ++i) {
                if (actions[i]) {
                    let frameActions = actions[i];
                    for (j = 0; j < frameActions.length; ++j) {
                        frameActions[j].call(this);
                    }
                }
                //handle looping around
                if (needsLoop && i === length - 1) {
                    i = 0;
                    length = currentFrame + 1;
                    needsLoop = false;
                }
            }
        }
    }

    destroy(destroyChildren) {
        if (this._tickListener) {
            SharedTicker.remove(this._tickListener);
            this._tickListener = null;
        }
        const hiddenChildren = [];
        let timelines = this._timelines;
        for (let i = 0; i < timelines.length; i++) {
            const timeline = timelines[i];
            hiddenChildren.push(timeline.target);
            timeline._currentProps = null;
            timeline.length = 0;
        }
        timelines = this._timedChildTimelines;
        for (let i = 0; i < timelines.length; i++) {
            const timeline = timelines[i];
            if (hiddenChildren.indexOf(timeline.target) < 0) {
                hiddenChildren.push(timeline.target);
            }
            timeline._currentProps = null;
            timeline.length = 0;
        }
        // Destroy all the children
        for (let i = 0; i < hiddenChildren.length; i++) {
            // Don't destroy children in the display list
            if (this.children.indexOf(hiddenChildren[i]) < 0) {
                hiddenChildren[i].destroy(destroyChildren);
            }
        }
        hiddenChildren.length = 0;
        this._actions = null;
        this._timelines = null;
        this._depthSorted = null;
        this._timedChildTimelines = null;
        this._beforeUpdate = null;
        this._labels = null;
        this._labelDict = null;
        super.destroy(destroyChildren);
    }
}

/**
 * The MovieClip will advance independently of its parent, even if its parent is paused.
 * This is the default mode.
 * @property INDEPENDENT
 * @static
 * @type String
 * @default 0
 * @readonly
 */
MovieClip.INDEPENDENT = 0;

/**
 * The MovieClip will only display a single frame (as determined by the startPosition property).
 * @property SINGLE_FRAME
 * @static
 * @type String
 * @default 1
 * @readonly
 */
MovieClip.SINGLE_FRAME = 1;

/**
 * The MovieClip will be advanced only when its parent advances and will be synched to the position of
 * the parent MovieClip.
 * @property SYNCHED
 * @static
 * @type String
 * @default 2
 * @readonly
 */
MovieClip.SYNCHED = 2;


/**
 * The default framerate if none is specified or there's not parent clip with a framerate.
 * @property DEFAULT_FRAMERATE
 * @static
 * @type Number
 * @default 24
 * @readonly
 */
MovieClip.DEFAULT_FRAMERATE = 24;

/**
 * Extend a container
 * @method extend
 * @static
 * @param {PIXI.animate.MovieClip} child The child function
 * @return {PIXI.animate.MovieClip} The child
 */
/**
 * Extend a container (alias for extend)
 * @method e
 * @static
 * @param {PIXI.animate.MovieClip} child The child function
 * @return {PIXI.animate.MovieClip} The child
 */
MovieClip.extend = MovieClip.e = function(child) {
    child.prototype = Object.create(MovieClip.prototype);
    child.prototype.__parent = MovieClip.prototype;
    child.prototype.constructor = child;
    return child;
};

// Assign to namespace
export default MovieClip;