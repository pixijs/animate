'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Timeline = require('./Timeline');

var _Timeline2 = _interopRequireDefault(_Timeline);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = PIXI.Container;
var SharedTicker = PIXI.ticker.shared;

/**
 * Provide timeline playback of movieclip
 * @memberof PIXI.animate
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

var MovieClip = function (_Container) {
    _inherits(MovieClip, _Container);

    function MovieClip(options, duration, loop, framerate, labels) {
        _classCallCheck(this, MovieClip);

        // Default options
        var _this = _possibleConstructorReturn(this, _Container.call(this));

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
         * @name PIXI.animate.MovieClip#mode
         * @type int
         * @default null
         */
        _this.mode = options.mode;

        /**
         * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
         * @name PIXI.animate.MovieClip#startPosition
         * @type Number
         * @default 0
         */
        _this.startPosition = options.startPosition;

        /**
         * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
         * @name PIXI.animate.MovieClip#loop
         * @type Boolean
         * @default true
         */
        _this.loop = !!options.loop;

        /**
         * The current frame of the movieclip.
         * @name PIXI.animate.MovieClip#currentFrame
         * @type Number
         * @default 0
         * @readOnly
         */
        _this.currentFrame = 0;

        /**
         * The collection of private labels
         * @name PIXI.animate.MovieClip#_labels
         * @type Array
         * @private
         */
        _this._labels = [];

        /**
         * The collection of private labels
         * @name PIXI.animate.MovieClip#_labelDict
         * @type Object
         * @private
         */
        _this._labelDict = options.labels;
        if (options.labels) {
            for (var name in options.labels) {
                var label = {
                    label: name,
                    position: options.labels[name]
                };
                _this._labels.push(label);
            }
            _this._labels.sort(function (a, b) {
                return a.position - b.position;
            });
        }

        /**
         * If true, this movieclip will animate automatically whenever it is on the stage.
         * @name PIXI.animate.MovieClip#selfAdvance
         * @type Boolean
         * @default true
         */
        _this.selfAdvance = true;

        /**
         * If true, the MovieClip's position will not advance when ticked.
         * @name PIXI.animate.MovieClip#paused
         * @type Boolean
         * @default false
         */
        _this.paused = false;

        /**
         * If true, actions in this MovieClip's tweens will be run when the playhead advances.
         * @name PIXI.animate.MovieClip#actionsEnabled
         * @type Boolean
         * @default true
         */
        _this.actionsEnabled = true;

        /**
         * If true, the MovieClip will automatically be reset to its first frame whenever the timeline adds
         * it back onto the display list. This only applies to MovieClip instances with mode=INDEPENDENT.
         * <br><br>
         * For example, if you had a character animation with a 'body' child MovieClip instance
         * with different costumes on each frame, you could set body.autoReset = false, so that
         * you can manually change the frame it is on, without worrying that it will be reset
         * automatically.
         * @name PIXI.animate.MovieClip#autoReset
         * @type Boolean
         * @default true
         */
        _this.autoReset = true;

        /**
         * @name PIXI.animate.MovieClip#_synchOffset
         * @type Number
         * @default 0
         * @private
         */
        _this._synchOffset = 0;

        /**
         * @name PIXI.animate.MovieClip#_prevPos
         * @type Number
         * @default -1
         * @private
         */
        _this._prevPos = -1; // TODO: evaluate using a ._reset Boolean prop instead of -1.

        /**
         * Note - changed from default: When the MovieClip is framerate independent, this is the time
         * elapsed from frame 0 in seconds.
         * @name PIXI.animate.MovieClip#_t
         * @type Number
         * @default 0
         * @private
         */
        _this._t = 0;

        /**
         * By default MovieClip instances advance one frame per tick. Specifying a framerate for the MovieClip
         * will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
         * framerate.
         *
         * @name PIXI.animate.MovieClip#_framerate
         * @type {Number}
         * @default 0
         * @protected
         */
        _this._framerate = options.framerate;

        /**
         * The total time in seconds for the animation. This is changed when setting the framerate.
         * @name PIXI.animate.MovieClip#_duration
         * @type Number
         * @default 0
         * @private
         */
        _this._duration = 0;

        /**
         * The total duration in frames for the animation.
         * @name PIXI.animate.MovieClip#_totalFrames
         * @type Number
         * @default 0
         * @private
         */
        _this._totalFrames = options.duration;

        /**
         * Standard tween timelines for all objects. Each element in the _timelines array
         * is a Timeline object - an array of tweens for one target, in order of occurrence.
         * @name PIXI.animate.MovieClip#_timelines
         * @type Array
         * @protected
         */
        _this._timelines = [];

        /**
         * Array of child timelines denoting if a child is actively a child of this movieclip
         * on any given frame. Each element in the _timedChildTimelines is an array with a 'target'
         * property, and is an array of boolean values indexed by frame.
         * @name PIXI.animate.MovieClip#_timedChildTimelines
         * @type {Array}
         * @protected
         */
        _this._timedChildTimelines = [];

        /**
         * Array to depth sort timed children
         * @name PIXI.animate.MovieClip#_depthSorted
         * @type {Array}
         * @private
         */
        _this._depthSorted = [];

        /**
         * Array of frame scripts, indexed by frame.
         * @name PIXI.animate.MovieClip#_actions
         * @type {Array}
         * @protected
         */
        _this._actions = [];

        /**
         * Optional callback fired before timeline is updated.
         * Can be used to clamp or update the currentFrame.
         * @name PIXI.animate.MovieClip#_beforeUpdate
         * @type {Function}
         * @private
         */
        _this._beforeUpdate = null;

        if (_this.mode === MovieClip.INDEPENDENT) {
            _this._tickListener = _this._tickListener.bind(_this);
            _this._onAdded = _this._onAdded.bind(_this);
            _this._onRemoved = _this._onRemoved.bind(_this);
            _this.on('added', _this._onAdded);
            _this.on('removed', _this._onRemoved);
        }

        if (options.framerate) {
            _this.framerate = options.framerate;
        }

        //save often used methods on the instance so that they can be fetched slightly faster
        //than if they had to be fetched from the prototype
        _this.advance = _this.advance;
        _this._updateTimeline = _this._updateTimeline;
        _this._setTimelinePosition = _this._setTimelinePosition;
        _this._goto = _this._goto;
        return _this;
    }

    MovieClip.prototype._onAdded = function _onAdded() {
        if (!this._framerate) {
            this.framerate = this.parentFramerate;
        }
        SharedTicker.add(this._tickListener);
    };

    MovieClip.prototype._tickListener = function _tickListener(tickerDeltaTime) {
        if (this.paused || !this.selfAdvance) {
            //see if the movieclip needs to be updated even though it isn't animating
            if (this._prevPos < 0) {
                this._goto(this.currentFrame);
            }
            return;
        }
        var seconds = tickerDeltaTime / SharedTicker.speed / PIXI.settings.TARGET_FPMS / 1000;
        this.advance(seconds);
    };

    MovieClip.prototype._onRemoved = function _onRemoved() {
        SharedTicker.remove(this._tickListener);
    };

    /**
     * Returns an array of objects with label and position (aka frame) properties, sorted by position.
     * @name PIXI.animate.MovieClip#labels
     * @type {Array}
     * @readonly
     */


    /**
     * Extend the timeline to the last frame.
     * @method PIXI.animate.MovieClip#_autoExtend
     * @private
     * @param {int} endFrame
     */
    MovieClip.prototype._autoExtend = function _autoExtend(endFrame) {
        if (this._totalFrames < endFrame) {
            this._totalFrames = endFrame;
        }
    };

    /**
     * Convert values of properties
     * @method PIXI.animate.MovieClip#_parseProperties
     * @private
     * @param {Object} properties
     */


    MovieClip.prototype._parseProperties = function _parseProperties(properties) {
        // Convert any string colors to uints
        if (typeof properties.t === 'string') {
            properties.t = _utils2.default.hexToUint(properties.t);
        } else if (typeof properties.v === 'number') {
            properties.v = !!properties.v;
        }
    };

    /**
     * Get a timeline for a child, synced timeline.
     * @method PIXI.animate.MovieClip#_getChildTimeline
     * @private
     * @param {PIXI.animate.MovieClip} instance
     * @return {PIXI.animate.Timeline}
     */


    MovieClip.prototype._getChildTimeline = function _getChildTimeline(instance) {
        for (var i = this._timelines.length - 1; i >= 0; --i) {
            if (this._timelines[i].target === instance) {
                return this._timelines[i];
            }
        }
        var timeline = new _Timeline2.default(instance);
        this._timelines.push(timeline);
        return timeline;
    };

    /**
     * Add mask or masks
     * @method PIXI.animate.MovieClip#addTimedMask
     * @param {PIXI.DisplayObject} instance Instance to mask
     * @param {Object} keyframes The map of frames to mask objects
     * @return {PIXI.animate.MovieClip} instance of clip for chaining
     */


    MovieClip.prototype.addTimedMask = function addTimedMask(instance, keyframes) {
        for (var i in keyframes) {
            this.addKeyframe(instance, {
                m: keyframes[i]
            }, parseInt(i, 10));
        }

        // Set the initial position/add
        this._setTimelinePosition(this.currentFrame, this.currentFrame, true);
        return this;
    };

    /**
     * Shortcut alias for `addTimedMask`
     * @method PIXI.animate.MovieClip#am
     * @param {PIXI.DisplayObject} instance Instance to mask
     * @param {Object} keyframes The map of frames to mask objects
     * @return {PIXI.animate.MovieClip} instance of clip for chaining
     */


    MovieClip.prototype.am = function am(instance, keyframes) {
        return this.addTimedMask(instance, keyframes);
    };

    /**
     * Add a tween to the clip
     * @method PIXI.animate.MovieClip#addTween
     * @param {PIXI.DisplayObject} instance The clip to tween
     * @param {Object} properties The property or property to tween
     * @param {int} startFrame The frame to start tweening
     * @param {int} [duration=0] Number of frames to tween. If 0, then the properties are set
     *                           with no tweening.
     * @param {Function} [ease] An optional easing function that takes the tween time from 0-1.
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.addTween = function addTween(instance, properties, startFrame, duration, ease) {

        var timeline = this._getChildTimeline(instance);
        this._parseProperties(properties);
        timeline.addTween(properties, startFrame, duration, ease);
        this._autoExtend(startFrame + duration);
        return this;
    };

    /**
     * Add a tween to the clip
     * @method PIXI.animate.MovieClip#addKeyframe
     * @param {PIXI.DisplayObject} instance The clip to tween
     * @param {Object} properties The property or property to tween
     * @param {int} startFrame The frame to start tweening
     * @param {int} [duration=0] Number of frames to tween. If 0, then the properties are set
     *                           with no tweening.
     * @param {Function} [ease] An optional easing function that takes the tween time from 0-1.
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.addKeyframe = function addKeyframe(instance, properties, startFrame) {

        var timeline = this._getChildTimeline(instance);
        this._parseProperties(properties);
        timeline.addKeyframe(properties, startFrame);
        this._autoExtend(startFrame);
        return this;
    };

    /**
     * Alias for method `addTimedChild`
     * @method PIXI.animate.MovieClip#at
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.at = function at(instance, startFrame, duration, keyframes) {
        return this.addTimedChild(instance, startFrame, duration, keyframes);
    };

    /**
     * Add a child to show for a certain number of frames before automatic removal.
     * @method PIXI.animate.MovieClip#addTimedChild
     * @param {PIXI.DisplayObject} instance The clip to show
     * @param {int} startFrame The starting frame
     * @param {int} [duration=1] The number of frames to display the child before removing it.
     * @param {String|Array} [keyframes] The collection of static keyframes to add
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.addTimedChild = function addTimedChild(instance, startFrame, duration, keyframes) {

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
        var timeline = void 0,
            i = void 0;
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
        _utils2.default.fillFrames(timeline, startFrame, duration);

        // Update the total frames if the instance extends our current
        // total frames for this movieclip
        if (this._totalFrames < startFrame + duration) {
            this._totalFrames = startFrame + duration;
        }

        // Add the collection of keyframes
        if (keyframes) {
            if (typeof keyframes === "string") {
                keyframes = _utils2.default.deserializeKeyframes(keyframes);
            }
            // Convert the keyframes object into
            // individual properties
            var lastFrame = {};
            for (var _i in keyframes) {
                lastFrame = Object.assign({}, lastFrame, keyframes[_i]);
                this.addKeyframe(instance, lastFrame, parseInt(_i, 10));
            }
            this._getChildTimeline(instance).extendLastFrame(startFrame + duration);
        }

        // Set the initial position/add
        this._setTimelinePosition(startFrame, this.currentFrame, true);

        return this;
    };

    /**
     * Short cut for `addAction`
     * @method PIXI.animate.MovieClip#aa
     * @param {Function} callback The clip call on a certain frame
     * @param {int|String} startFrame The starting frame index or label
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.aa = function aa(callback, startFrame) {
        return this.addAction(callback, startFrame);
    };

    /**
     * Handle frame actions, callback is bound to the instance of the MovieClip.
     * @method PIXI.animate.MovieClip#addAction
     * @param {Function} callback The clip call on a certain frame
     * @param {int|String} startFrame The starting frame index or label
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.addAction = function addAction(callback, startFrame) {

        if (typeof startFrame === 'string') {
            var index = this._labelDict[startFrame];
            if (index === undefined) {
                throw 'The label \'' + startFrame + '\' does not exist on this timeline';
            }
            startFrame = index;
        }

        var actions = this._actions;
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
    };

    /**
     * Short cut for `playSound`
     * @method PIXI.animate.MovieClip#ps
     * @param {String} alias The name of the Sound
     * @param {Boolean} [loop=false] The loop property of the sound
     * @param {MovieClip} context The MovieClip the sound originates from
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.ps = function ps(alias, loop) {
        return this.playSound(alias, loop);
    };

    /**
     * Handle sounds.
     * @method PIXI.animate.MovieClip#playSound
     * @param {String} alias The name of the Sound
     * @param {Boolean} [loop=false] The loop property of the sound
     * @param {MovieClip} context The MovieClip the sound originates from
     * @return {PIXI.animate.MovieClip}
     */


    MovieClip.prototype.playSound = function playSound(alias, loop) {
        PIXI.animate.sound.emit('play', alias, !!loop, this);
        return this;
    };

    /**
     * Sets paused to false.
     * @method PIXI.animate.MovieClip#play
     */


    MovieClip.prototype.play = function play() {
        this.paused = false;
    };

    /**
     * Sets paused to true.
     * @method PIXI.animate.MovieClip#stop
     */


    MovieClip.prototype.stop = function stop() {
        this.paused = true;
    };

    /**
     * Advances this movie clip to the specified position or label and sets paused to false.
     * @method PIXI.animate.MovieClip#gotoAndPlay
     * @param {String|Number} positionOrLabel The animation name or frame number to go to.
     */


    MovieClip.prototype.gotoAndPlay = function gotoAndPlay(positionOrLabel) {
        this.paused = false;
        this._goto(positionOrLabel);
    };

    /**
     * Advances this movie clip to the specified position or label and sets paused to true.
     * @method PIXI.animate.MovieClip#gotoAndStop
     * @param {String|Number} positionOrLabel The animation or frame name to go to.
     */


    MovieClip.prototype.gotoAndStop = function gotoAndStop(positionOrLabel) {
        this.paused = true;
        this._goto(positionOrLabel);
    };

    /**
     * Get the close parent with a valid framerate. If no parent, returns the default framerate.
     * @name PIXI.animate.MovieClip#parentFramerate
     * @type {Number}
     * @readOnly
     */


    /**
     * Advances the playhead. This occurs automatically each tick by default.
     * @method PIXI.animate.MovieClip#advance
     * @param [time] {Number} The amount of time in seconds to advance by. Only applicable if framerate is set.
     */
    MovieClip.prototype.advance = function advance(time) {

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
        var afterUpdateOnce = void 0;
        if (this._beforeUpdate) {
            afterUpdateOnce = this._beforeUpdate(this);
        }
        //update all tweens & actions in the timeline
        this._updateTimeline();

        // Do the animator callback here
        if (afterUpdateOnce) {
            afterUpdateOnce();
        }
    };

    /**
     * @method PIXI.animate.MovieClip#_goto
     * @param {String|Number} positionOrLabel The animation name or frame number to go to.
     * @protected
     */


    MovieClip.prototype._goto = function _goto(positionOrLabel) {
        var pos = typeof positionOrLabel === 'string' ? this._labelDict[positionOrLabel] : positionOrLabel;
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
    };

    /**
     * @method PIXI.animate.MovieClip#_reset
     * @private
     */


    MovieClip.prototype._reset = function _reset() {
        this._prevPos = -1;
        this._t = 0;
        this.currentFrame = 0;
    };

    /**
     * @method PIXI.animate.MovieClip#_updateTimeline
     * @protected
     */


    MovieClip.prototype._updateTimeline = function _updateTimeline() {
        var synched = this.mode !== MovieClip.INDEPENDENT;

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
    };

    /**
     * Set the timeline position
     * @method PIXI.animate.MovieClip#_setTimelinePosition
     * @protected
     * @param {int} startFrame
     * @param {int} currentFrame
     * @param {Boolean} doActions
     */


    MovieClip.prototype._setTimelinePosition = function _setTimelinePosition(startFrame, currentFrame, doActions) {
        //handle all tweens
        var i = void 0,
            j = void 0,
            length = void 0,
            _timelines = this._timelines;
        for (i = _timelines.length - 1; i >= 0; --i) {
            var timeline = _timelines[i];
            for (j = 0, length = timeline.length; j < length; ++j) {
                var tween = timeline[j];
                //if the tween contains part of the timeline that we are travelling through
                if (currentFrame >= tween.startFrame && currentFrame <= tween.endFrame) {
                    // set the position within that tween
                    //and break the loop to move onto the next timeline
                    tween.setPosition(currentFrame);
                    break;
                }
            }
        }

        var timedChildTimelines = this._timedChildTimelines;
        var depthSorted = this._depthSorted;
        for (i = 0, length = timedChildTimelines.length; i < length; ++i) {
            var target = timedChildTimelines[i].target;
            var shouldBeChild = timedChildTimelines[i][currentFrame];
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
            var _target = depthSorted[i];
            var currentIndex = this.children.indexOf(_target);
            if (currentIndex !== i) {
                this.addChildAt(_target, i);
            }
        }

        // Clear the temporary depth sorting array
        depthSorted.length = 0;

        //go through all children and update synched movieclips that are not single frames
        var children = this.children,
            child = void 0;
        for (i = 0, length = children.length; i < length; ++i) {
            child = children[i];
            if (child.mode === MovieClip.SYNCHED) {
                child._synchOffset = currentFrame - child.parentStartPosition;
                child._updateTimeline();
            }
        }

        //handle actions
        if (doActions) {
            var actions = this._actions;
            //handle looping around
            var needsLoop = false;
            if (currentFrame < startFrame) {
                length = actions.length;
                needsLoop = true;
            } else {
                length = Math.min(currentFrame + 1, actions.length);
            }
            for (i = startFrame >= 0 ? startFrame + 1 : currentFrame; i < length; ++i) {
                if (actions[i]) {
                    var frameActions = actions[i];
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
    };

    MovieClip.prototype.destroy = function destroy(destroyChildren) {
        if (this._tickListener) {
            SharedTicker.remove(this._tickListener);
            this._tickListener = null;
        }
        var hiddenChildren = [];
        var timelines = this._timelines;
        if (timelines) {
            for (var i = 0; i < timelines.length; i++) {
                var timeline = timelines[i];
                hiddenChildren.push(timeline.target);
                timeline._currentProps = null;
                timeline.length = 0;
            }
        }
        timelines = this._timedChildTimelines;
        if (timelines) {
            for (var _i2 = 0; _i2 < timelines.length; _i2++) {
                var _timeline = timelines[_i2];
                if (hiddenChildren.indexOf(_timeline.target) < 0) {
                    hiddenChildren.push(_timeline.target);
                }
                _timeline._currentProps = null;
                _timeline.length = 0;
            }
        }
        // Destroy all the children
        for (var _i3 = 0; _i3 < hiddenChildren.length; _i3++) {
            // Don't destroy children in the display list
            if (this.children.indexOf(hiddenChildren[_i3]) < 0) {
                hiddenChildren[_i3].destroy(destroyChildren);
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
        _Container.prototype.destroy.call(this, destroyChildren);
    };

    _createClass(MovieClip, [{
        key: 'labels',
        get: function get() {
            return this._labels;
        }

        /**
         * Returns a dictionary of labels where key is the label and value is the frame.
         * @name PIXI.animate.MovieClip#labelsMap
         * @type {Object}
         * @readonly
         */

    }, {
        key: 'labelsMap',
        get: function get() {
            return this._labelDict;
        }

        /**
         * Returns the name of the label on or immediately before the current frame.
         * @name PIXI.animate.MovieClip#currentLabel
         * @type {String}
         * @readonly
         */

    }, {
        key: 'currentLabel',
        get: function get() {
            var labels = this._labels;
            var current = null;
            for (var i = 0, len = labels.length; i < len; ++i) {
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
         * @name PIXI.animate.MovieClip#elapsedTime
         * @type Number
         * @default 0
         * @public
         */

    }, {
        key: 'elapsedTime',
        get: function get() {
            return this._t;
        },
        set: function set(value) {
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
         * @name PIXI.animate.MovieClip#framerate
         * @type {Number}
         * @default 0
         */

    }, {
        key: 'framerate',
        get: function get() {
            return this._framerate;
        },
        set: function set(value) {
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
         * @name PIXI.animate.MovieClip#totalFrames
         * @type {Number}
         * @default 0
         * @readOnly
         */

    }, {
        key: 'totalFrames',
        get: function get() {
            return this._totalFrames;
        }
    }, {
        key: 'parentFramerate',
        get: function get() {
            var o = this,
                fps = o._framerate;
            while ((o = o.parent) && !fps) {
                if (o.mode === MovieClip.INDEPENDENT) {
                    fps = o._framerate;
                }
            }
            return fps || MovieClip.DEFAULT_FRAMERATE;
        }
    }]);

    return MovieClip;
}(Container);

/**
 * The MovieClip will advance independently of its parent, even if its parent is paused.
 * This is the default mode.
 * @name PIXI.animate.MovieClip.INDEPENDENT
 * @static
 * @type String
 * @default 0
 * @readonly
 */


MovieClip.INDEPENDENT = 0;

/**
 * The MovieClip will only display a single frame (as determined by the startPosition property).
 * @name PIXI.animate.MovieClip.SINGLE_FRAME
 * @static
 * @type String
 * @default 1
 * @readonly
 */
MovieClip.SINGLE_FRAME = 1;

/**
 * The MovieClip will be advanced only when its parent advances and will be synched to the position of
 * the parent MovieClip.
 * @name PIXI.animate.MovieClip.SYNCHED
 * @static
 * @type String
 * @default 2
 * @readonly
 */
MovieClip.SYNCHED = 2;

/**
 * The default framerate if none is specified or there's not parent clip with a framerate.
 * @name PIXI.animate.MovieClip.DEFAULT_FRAMERATE
 * @static
 * @type Number
 * @default 24
 * @readonly
 */
MovieClip.DEFAULT_FRAMERATE = 24;

/**
 * Extend a container
 * @method PIXI.animate.MovieClip.extend
 * @static
 * @param {PIXI.animate.MovieClip} child The child function
 * @return {PIXI.animate.MovieClip} The child
 */
/**
 * Extend a container (alias for `extend`)
 * @method PIXI.animate.MovieClip.e
 * @static
 * @param {PIXI.animate.MovieClip} child The child function
 * @return {PIXI.animate.MovieClip} The child
 */
MovieClip.extend = MovieClip.e = function (child) {
    child.prototype = Object.create(MovieClip.prototype);
    child.prototype.__parent = MovieClip.prototype;
    child.prototype.constructor = child;
    return child;
};

// Assign to namespace
exports.default = MovieClip;
//# sourceMappingURL=MovieClip.js.map