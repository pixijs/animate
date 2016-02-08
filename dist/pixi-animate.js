/*! PixiAnimate 0.3.0 */
/* jshint ignore:start */
(function(Array, undefined)
{
	"use strict";

	// Some lookup tables
	var chrTable = new Array(256),
		maskTable = new Array(9),
		powTable = new Array(9),
		reversePowTable = new Array(9);

	for (var i = 0; i < 256; i++)
	{
		chrTable[i] = String.fromCharCode(i);
	}

	for (var f = 0; f < 9; f++)
	{
		maskTable[f] = ~((powTable[f] = Math.pow(2, f) - 1) ^ 0xFF);
		reversePowTable[f] = Math.pow(10, f);
	}

	var bitStream = '',
		bitValue = 0,
		bitsLeft = 8,
		streamIndex = 0;

	function write(val, count)
	{

		var overflow = count - bitsLeft,
			use = bitsLeft < count ? bitsLeft : count,
			shift = bitsLeft - use;

		if (overflow > 0)
		{
			bitValue += val >> overflow << shift;

		}
		else
		{
			bitValue += val << shift;
		}

		bitsLeft -= use;

		if (bitsLeft === 0)
		{

			bitStream += chrTable[bitValue];
			bitsLeft = 8;
			bitValue = 0;

			if (overflow > 0)
			{
				bitValue += (val & powTable[overflow]) << (8 - overflow);
				bitsLeft -= overflow;
			}

		}

	}

	function read(count)
	{

		var overflow = count - bitsLeft,
			use = bitsLeft < count ? bitsLeft : count,
			shift = bitsLeft - use;

		// Wrap bits over to next byte
		var val = (bitValue & maskTable[bitsLeft]) >> shift;
		bitsLeft -= use;

		if (bitsLeft === 0)
		{

			bitValue = bitStream.charCodeAt(++streamIndex);
			bitsLeft = 8;

			if (overflow > 0)
			{
				val = val << overflow | ((bitValue & maskTable[bitsLeft]) >> 8 - overflow);
				bitsLeft -= overflow;
			}

		}

		if (streamIndex > bitStream.length)
		{
			return 7;
		}

		return val;

	}


	// Encoder ----------------------------------------------------------------
	function _encode(value, top)
	{

		// Numbers
		if (typeof value === 'number')
		{

			var type = value !== (value | 0) ? 1 : 0,
				sign = 0;

			if (value < 0)
			{
				value = -value;
				sign = 1;
			}

			write(1 + type, 3);

			// Float
			if (type)
			{

				var shift = 0,
					step = 10,
					m = value,
					tmp = 0;

				// Figure out the exponent
				do {
					m = value * step;
					step *= 10;
					shift++;
					tmp = m | 0;

				} while (m - tmp > 1 / step && shift < 8 && m < 214748364);

				// Correct if we overshoot
				step = tmp / 10;
				if (step === (step | 0))
				{
					tmp = step;
					shift--;
				}

				value = tmp;

			}

			// 2 size 0-3: 0 = < 16 1 = < 256 2 = < 65536 3 >=
			if (value < 2)
			{
				write(value, 4);

			}
			else if (value < 16)
			{
				write(1, 3);
				write(value, 4);

			}
			else if (value < 256)
			{
				write(2, 3);
				write(value, 8);

			}
			else if (value < 4096)
			{
				write(3, 3);
				write(value >> 8 & 0xff, 4);
				write(value & 0xff, 8);

			}
			else if (value < 65536)
			{
				write(4, 3);
				write(value >> 8 & 0xff, 8);
				write(value & 0xff, 8);

			}
			else if (value < 1048576)
			{
				write(5, 3);
				write(value >> 16 & 0xff, 4);
				write(value >> 8 & 0xff, 8);
				write(value & 0xff, 8);

			}
			else if (value < 16777216)
			{
				write(6, 3);
				write(value >> 16 & 0xff, 8);
				write(value >> 8 & 0xff, 8);
				write(value & 0xff, 8);

			}
			else
			{
				write(7, 3);
				write(value >> 24 & 0xff, 8);
				write(value >> 16 & 0xff, 8);
				write(value >> 8 & 0xff, 8);
				write(value & 0xff, 8);
			}

			write(sign, 1);

			if (type)
			{
				write(shift, 4);
			}

			// Strings
		}
		else if (typeof value === 'string')
		{

			var len = value.length;
			write(3, 3);

			if (len > 65535)
			{
				write(31, 5);
				write(len >> 24 & 0xff, 8);
				write(len >> 16 & 0xff, 8);
				write(len >> 8 & 0xff, 8);
				write(len & 0xff, 8);

			}
			else if (len > 255)
			{
				write(30, 5);
				write(len >> 8 & 0xff, 8);
				write(len & 0xff, 8);

			}
			else if (len > 28)
			{
				write(29, 5);
				write(len, 8);

			}
			else
			{
				write(len, 5);
			}

			// Write a raw string to the stream
			if (bitsLeft !== 8)
			{
				bitStream += chrTable[bitValue];
				bitValue = 0;
				bitsLeft = 8;
			}

			bitStream += value;

			// Booleans
		}
		else if (typeof value === 'boolean')
		{
			write(+value, 4);

			// Null
		}
		else if (value === null)
		{
			write(7, 3);
			write(0, 1);

			// Arrays
		}
		else if (value instanceof Array)
		{

			write(4, 3);
			for (var i = 0, l = value.length; i < l; i++)
			{
				_encode(value[i]);
			}

			if (!top)
			{
				write(6, 3);
			}

			// Object
		}
		else
		{

			write(5, 3);
			for (var e in value)
			{
				_encode(e);
				_encode(value[e]);
			}

			if (!top)
			{
				write(6, 3);
			}

		}

	}

	function encode(value)
	{

		bitsLeft = 8;
		bitValue = 0;
		bitStream = '';

		_encode(value, true);

		write(7, 3);
		write(1, 1);

		if (bitValue > 0)
		{
			bitStream += chrTable[bitValue];
		}

		return bitStream;

	}

	// Decoder ----------------------------------------------------------------
	function decode(string)
	{

		var stack = [],
			i = -1,
			decoded,
			type, top, value,
			getKey = false,
			key, isObj;

		bitsLeft = 8;
		streamIndex = 0;
		bitStream = string;
		bitValue = bitStream.charCodeAt(streamIndex);

		while (true)
		{

			// Grab type
			type = read(3);

			switch (type)
			{

				// Bool
				case 0:
					value = read(1) ? true : false;
					break;

					// EOS / Stream Overrun / Null
				case 7:
					switch (read(1))
					{
						case 1:
							return decoded;

						case 7:
							return undefined;

						default:
							value = null;
					}
					break;

					// Integer / Float
				case 1:
				case 2:
					switch (read(3))
					{
						case 0:
							value = read(1);
							break;

						case 1:
							value = read(4);
							break;

						case 2:
							value = read(8);
							break;

						case 3:
							value = (read(4) << 8) + read(8);

							break;

						case 4:
							value = (read(8) << 8) + read(8);

							break;

						case 5:
							value = (read(4) << 16) + (read(8) << 8) + read(8);

							break;

						case 6:
							value = (read(8) << 16) + (read(8) << 8) + read(8);

							break;

						case 7:
							value = (read(8) << 24) + (read(8) << 16) + (read(8) << 8) + read(8);

							break;
					}

					if (read(1))
					{
						value = -value;
					}

					if (type === 2)
					{
						value /= reversePowTable[read(4)];
					}

					break;

					// String
				case 3:

					var size = read(5);
					switch (size)
					{
						case 31:
							size = (read(8) << 24) + (read(8) << 16) + (read(8) << 8) + read(8);

							break;

						case 30:
							size = (read(8) << 8) + read(8);

							break;

						case 29:
							size = read(8);
							break;

					}

					// Read a raw string from the stream
					if (bitsLeft !== 8)
					{
						streamIndex++;
						bitValue = 0;
						bitsLeft = 8;
					}

					value = bitStream.substr(streamIndex, size);
					streamIndex += size;
					bitValue = bitStream.charCodeAt(streamIndex);

					if (getKey)
					{
						key = value;
						getKey = false;
						continue;
					}

					break;

					// Open Array / Objects
				case 4:
				case 5:
					getKey = type === 5;
					value = getKey ?
					{} : [];

					if (decoded === undefined)
					{
						decoded = value;

					}
					else
					{

						if (isObj)
						{
							top[key] = value;

						}
						else
						{
							top.push(value);
						}
					}

					top = stack[++i] = value;
					isObj = !(top instanceof Array);
					continue;

					// Close Array / Object
				case 6:
					top = stack[--i];
					getKey = isObj = !(top instanceof Array);
					continue;
			}

			// Assign value to top of stack or return value
			if (isObj)
			{
				top[key] = value;
				getKey = true;

			}
			else if (top !== undefined)
			{
				top.push(value);

			}
			else
			{
				return value;
			}

		}

	}

	// Exports
	if (typeof exports !== 'undefined')
	{
		exports.encode = encode;
		exports.decode = decode;

	}
	else
	{
		window.BISON = {
			encode: encode,
			decode: decode
		};
	}

})(Array);
/* jshint ignore:end */
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(window)
{
	if (!window.PIXI)
	{
		if (true)
		{
			throw "PixiAnimate requires PIXI to be loaded before PixiAnimate is loaded!";
		}
		else
		{
			throw "Requires PIXI";
		}
	}

	// Define PIXI Flash namespace
	window.PIXI.animate = {};

}(window));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	/**
	 * Contains the collection of graphics data
	 * @class GraphicsCache
	 */
	var GraphicsCache = {};

	/**
	 * Add an item or itesm to the cache
	 * @method add
	 * @static
	 * @param {String|Object} prop  The id of graphic or map
	 * @param {Array} [value] If adding a single property, the draw commands
	 */
	Object.defineProperty(GraphicsCache, "add",
	{
		enumerable: false,
		value: function(prop, value)
		{
			if (typeof prop == "object")
			{
				for (var id in prop)
				{
					GraphicsCache.add(id, prop[id]);
				}
			}
			else
			{
				GraphicsCache[prop] = value;
			}
		}
	});

	/**
	 * Decode a resource to the cache
	 * @method decode
	 * @static
	 * @param  {String} str The string to decode
	 */
	Object.defineProperty(GraphicsCache, "decode",
	{
		enumerable: false,
		value: function(str)
		{
			GraphicsCache.add(BISON.decode(str));
		}
	});

	/**
	 * Get the graphic from cache
	 * @method  fromCache
	 * @static
	 * @param  {String} id The cache id
	 * @return {Array} Series of graphic draw commands
	 */
	Object.defineProperty(GraphicsCache, "fromCache",
	{
		enumerable: false,
		value: function(id)
		{
			return GraphicsCache[id] || null;
		}
	});

	/**
	 * Remove the graphic from cache
	 * @method  remove
	 * @static
	 * @param  {String} id The cache id
	 */
	Object.defineProperty(GraphicsCache, "remove",
	{
		enumerable: false,
		value: function(id)
		{
			if (GraphicsCache[id])
			{
				GraphicsCache[id].length = 0;
				delete GraphicsCache[id];
			}
		}
	});

	/**
	 * Remove all graphics from cache
	 * @method  removeAll
	 * @static
	 */
	Object.defineProperty(GraphicsCache, "removeAll",
	{
		enumerable: false,
		value: function()
		{
			for (var id in GraphicsCache)
			{
				GraphicsCache.remove(id);
			}
		}
	});

	// Assign to namespace
	PIXI.animate.GraphicsCache = GraphicsCache;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	var GraphicsCache = PIXI.animate.GraphicsCache;
	var Texture = PIXI.Texture;
	var Loader = PIXI.loaders.Loader;

	/**
	 * The middleware for PIXI's ResourceLoader to be able to 
	 * load Flash symbols such as graphics and images.
	 * @class SymbolLoader
	 */
	var SymbolLoader = function()
	{
		return function(resource, next)
		{
			if (/_graphics_\.bson$/i.test(resource.url))
			{
				GraphicsCache.decode(resource.data);
			}
			else if (/_graphics_\.json$/i.test(resource.url))
			{
				GraphicsCache.add(resource.data);
			}
			else if (resource.data.nodeName && resource.data.nodeName == "IMG")
			{
				// Add individual images to the texture cache by their
				// short symbol name, not the URL
				Texture.addTextureToCache(
					Texture.fromFrame(resource.url),
					resource.name
				);
			}
			next();
		};
	};

	// Assign to the loader
	Loader.addPixiMiddleware(SymbolLoader);

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI, undefined)
{
	var Container = PIXI.Container,
		DisplayObject = PIXI.DisplayObject,
		Timeline = PIXI.animate.Timeline,
		Tween = PIXI.animate.Tween,
		SharedTicker = PIXI.ticker.shared;

	/**
	 * Provide timeline playback of movieclip
	 * @class MovieClip
	 * @extends PIXI.Container
	 */
	var MovieClip = function(mode, startPosition, loop, labels)
	{
		Container.call(this);

		/**
		 * Controls how this MovieClip advances its time. Must be one of 0 (INDEPENDENT), 1 (SINGLE_FRAME), or 2 (SYNCHED).
		 * See each constant for a description of the behaviour.
		 * @property mode
		 * @type int
		 * @default null
		 **/
		this.mode = mode || MovieClip.INDEPENDENT;

		/**
		 * Specifies what the first frame to play in this movieclip, or the only frame to display if mode is SINGLE_FRAME.
		 * @property startPosition
		 * @type Number
		 * @default 0
		 */
		this.startPosition = startPosition || 0;

		/**
		 * Indicates whether this MovieClip should loop when it reaches the end of its timeline.
		 * @property loop
		 * @type Boolean
		 * @default true
		 */
		this.loop = !!loop;

		/**
		 * The current frame of the movieclip.
		 * @property currentFrame
		 * @type Number
		 * @default 0
		 * @readonly
		 */
		this.currentFrame = 0;

		this._labels = [];
		this._labelDict = labels ||
		{};
		if (labels)
		{
			for (var name in labels)
			{
				var label = {
					label: name,
					position: labels[name]
				};
				this._labels.push(label);
			}
			this._labels.sort(function(a, b)
			{
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
		 * For example, if you had a character animation with a "body" child MovieClip instance
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
		 **/
		this._framerate = 0;
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
		 * @property _frameDuration
		 * @type Number
		 * @default 0
		 * @private
		 */
		this._frameDuration = 0;

		/**
		 * Standard tween timelines for all objects. Each element in the _timelines array
		 * is an array of tweens for one target, in order of occurrence.
		 * @property _timelines
		 * @type Array
		 * @protected
		 **/
		this._timelines = [];

		/**
		 * Array of frame scripts, indexed by frame.
		 * @property _actions
		 * @type {Array}
		 * @protected
		 */
		this._actions = [];

		if (this.mode == MovieClip.INDEPENDENT)
		{
			this._tickListener = this._tickListener.bind(this);
			this._onAdded = this._onAdded.bind(this);
			this._onRemoved = this._onRemoved.bind(this);
			this.on("added", this._onAdded);
			this.on("removed", this._onRemoved);
		}
	};

	/**
	 * The MovieClip will advance independently of its parent, even if its parent is paused.
	 * This is the default mode.
	 * @property INDEPENDENT
	 * @static
	 * @type String
	 * @default 0
	 * @readonly
	 **/
	MovieClip.INDEPENDENT = 0;

	/**
	 * The MovieClip will only display a single frame (as determined by the startPosition property).
	 * @property SINGLE_FRAME
	 * @static
	 * @type String
	 * @default 1
	 * @readonly
	 **/
	MovieClip.SINGLE_FRAME = 1;

	/**
	 * The MovieClip will be advanced only when its parent advances and will be synched to the position of
	 * the parent MovieClip.
	 * @property SYNCHED
	 * @static
	 * @type String
	 * @default 2
	 * @readonly
	 **/
	MovieClip.SYNCHED = 2;

	var p = MovieClip.prototype = Object.create(Container.prototype);

	//constructor for backwards/Flash exporting compatibility
	p.initialize = MovieClip;

	p._onAdded = function()
	{
		SharedTicker.add(this._tickListener);
	};

	p._tickListener = function(tickerDeltaTime)
	{
		if (this.paused || !this.selfAdvance)
		{
			//see if the movieclip needs to be updated even though it isn't animating
			if (this._prevPos < 0)
				this._goto(this.currentFrame);
			return;
		}
		var seconds = tickerDeltaTime / SharedTicker.speed / PIXI.TARGET_FPMS / 1000;
		this._tick(seconds);
	};

	p._onRemoved = function()
	{
		SharedTicker.remove(this._tickListener);
	};

	/**
	 * Returns a sorted list of the labels defined on this AdvancedMovieClip.
	 * @method getLabels
	 * @return {Array[Object]} A sorted array of objects with label and position (aka frame)
	 *                        properties.
	 */
	p.getLabels = function()
	{
		return this._labels;
	};

	/**
	 * Returns the name of the label on or immediately before the current frame.
	 * @method getCurrentLabel
	 * @return {String} The name of the current label or null if there is no label.
	 */
	p.getCurrentLabel = function()
	{
		var labels = this._labels;
		var current = null;
		for (var i = 0, len = labels.length; i < len; ++i)
		{
			if (labels[i].position <= this.currentFrame)
				current = labels[i].label;
			else
				break;
		}
		return current;
	};

	/**
	 * Returns an array of objects with label and position (aka frame) properties, sorted by position.
	 * @property labels
	 * @type {Array}
	 * @readonly
	 **/

	/**
	 * Returns the name of the label on or immediately before the current frame.
	 * @property currentLabel
	 * @type {String}
	 * @readonly
	 **/
	try
	{
		Object.defineProperties(p,
		{
			labels:
			{
				get: p.getLabels
			},
			currentLabel:
			{
				get: p.getCurrentLabel
			}
		});
	}
	catch (e)
	{}

	/**
	 * When the MovieClip is framerate independent, this is the time elapsed from frame 0 in seconds.
	 * @property elapsedTime
	 * @type Number
	 * @default 0
	 * @public
	 */
	Object.defineProperty(p, 'elapsedTime',
	{
		get: function()
		{
			return this._t;
		},
		set: function(value)
		{
			this._t = value;
		}
	});

	/**
	 * By default MovieClip instances advance one frame per tick. Specifying a framerate for the MovieClip
	 * will cause it to advance based on elapsed time between ticks as appropriate to maintain the target
	 * framerate.
	 *
	 * For example, if a MovieClip with a framerate of 10 is placed on a Stage being updated at 40fps, then the MovieClip will
	 * advance roughly one frame every 4 ticks. This will not be exact, because the time between each tick will
	 * vary slightly between frames.
	 *
	 * This feature is dependent on the tick event object (or an object with an appropriate "delta" property) being
	 * passed into {{#crossLink "Stage/update"}}{{/crossLink}}.
	 * @property framerate
	 * @type {Number}
	 * @default 0
	 **/
	Object.defineProperty(p, 'framerate',
	{
		get: function()
		{
			return this._framerate;
		},
		set: function(value)
		{
			if (value > 0)
			{
				this._framerate = value;
				this._duration = value ? this._frameDuration / value : 0;
			}
			else
				this._framerate = this._duration = 0;
		}
	});

	/**
	 * Add a tween to the clip
	 * @method addTween
	 * @param {PIXI.DisplayObject} instance The clip to tween
	 * @param {Object} properties The property or property to tween
	 * @param {int} startFrame The frame to start tweening
	 * @param {int} [duration=0] Number of frames to tween. If 0, then the properties are set
	 *                           with no tweening.
	 * @param {Function} [ease] An optional easing function that takes the tween time from 0-1.
	 * @return {MovieClip}
	 */
	p.tw = p.addTween = function(instance, properties, startFrame, duration, ease)
	{
		//1. determine if there is already a tween for this instance, and if so prepare to add it
		//   on/insert it - if there isn't, then make one and set up a wait until startFrame
		var timeline, i;
		for (i = this._timelines.length - 1; i >= 0; --i)
		{
			if (this._timelines[i].target == instance)
			{
				timeline = this._timelines[i];
				break;
			}
		}
		if (!timeline)
		{
			timeline = new Timeline(instance);
			this._timelines.push(timeline);
		}
		//2. create the tween segment, recording the starting values of properties and using the
		//   supplied properties as the ending values
		timeline.addTween(instance, properties, startFrame, duration, ease);
		return this;
	};

	/**
	 * Add a child to show for a certain number of frames before automatic removal.
	 * @method addTimedChild
	 * @param {PIXI.DisplayObject} instance The clip to show
	 * @param {int} startFrame The starting frame
	 * @param {int} [duration=1] The number of frames to display the child before removing it.
	 * @return {MovieClip}
	 */
	p.at = p.addTimedChild = function(instance, startFrame, duration)
	{
		if (startFrame == null) // jshint ignore:line
			startFrame = 0;
		if (duration == null || duration < 1) // jshint ignore:line
			duration = 1;
		//TODO: add tweening info about this child's visibility/presence on stage
		//when the child is added, if it has 'autoReset' set to true, then it should be set back to
		//frame 0
		return this;
	};

	/**
	 * Handle frame actions, callback is bound to the instance of the MovieClip
	 * @method addAction
	 * @param {Function} callback The clip call on a certain frame
	 * @param {int} startFrame The starting frame
	 * @return {MovieClip}
	 */
	p.aa = p.addAction = function(callback, startFrame)
	{
		var _actions = this._actions;
		//ensure that the movieclip timeline is long enough to support the target frame
		if (_actions.length <= startFrame)
			_actions.length = startFrame + 1;
		if (this._frameDuration <= startFrame)
			this._frameDuration = startFrame;
		//add the action
		if (_actions[startFrame])
		{
			_actions[startFrame].push(callback);
		}
		else
		{
			_actions[startFrame] = [callback];
		}
		return this;
	};

	/**
	 * Sets paused to false.
	 * @method play
	 **/
	p.play = function()
	{
		this.paused = false;
	};

	/**
	 * Sets paused to true.
	 * @method stop
	 **/
	p.stop = function()
	{
		this.paused = true;
	};

	/**
	 * Advances this movie clip to the specified position or label and sets paused to false.
	 * @method gotoAndPlay
	 * @param {String|Number} positionOrLabel The animation name or frame number to go to.
	 **/
	p.gotoAndPlay = function(positionOrLabel)
	{
		this.paused = false;
		this._goto(positionOrLabel);
	};

	/**
	 * Advances this movie clip to the specified position or label and sets paused to true.
	 * @method gotoAndStop
	 * @param {String|Number} positionOrLabel The animation or frame name to go to.
	 **/
	p.gotoAndStop = function(positionOrLabel)
	{
		this.paused = true;
		this._goto(positionOrLabel);
	};

	/**
	 * Advances the playhead. This occurs automatically each tick by default.
	 * @param [time] {Number} The amount of time in seconds to advance by. Only applicable if framerate is set.
	 * @method advance
	 */
	p.advance = function(time)
	{
		if (!this._framerate)
		{
			var o = this,
				fps = o._framerate;
			while ((o = o.parent) && !fps)
			{
				if (o.mode == MovieClip.INDEPENDENT)
				{
					fps = o._framerate;
				}
			}
			this.framerate = fps;
		}

		if (time)
			this._t += time;
		if (this._t > this._duration)
			this._t = this.loop ? this._t - this._duration : this._duration;
		//add a tiny amount to account for potential floating point errors
		this.currentFrame = Math.floor(this._t * this._framerate + 0.00000001);
		//final error checking
		if (this.currentFrame >= this._frameDuration)
			this.currentFrame = this._frameDuration - 1;
		//update all tweens & actions in the timeline
		this._updateTimeline();
	};

	/**
	 * @method _tick
	 * @param {Number} delta Time elapsed since the previous tick, in seconds.
	 * @protected
	 **/
	p._tick = function(delta)
	{
		this.advance(delta);
	};

	/**
	 * @method _goto
	 * @param {String|Number} positionOrLabel The animation name or frame number to go to.
	 * @protected
	 **/
	p._goto = function(positionOrLabel)
	{
		var pos = typeof positionOrLabel == "string" ? this._labelDict[positionOrLabel] : positionOrLabel;
		if (pos == null) // jshint ignore:line
		{
			return;
		}
		// prevent _updateTimeline from overwriting the new position because of a reset:
		if (this._prevPos == -1)
		{
			this._prevPos = NaN;
		}
		this.currentFrame = pos;
		//update the elapsed time if a time based movieclip
		if (this._framerate > 0)
			this._t = pos / this._framerate;
		else
			this._t = 0;
		this._updateTimeline();
	};

	/**
	 * @method _reset
	 * @private
	 **/
	p._reset = function()
	{
		this._prevPos = -1;
		this._t = 0;
		this.currentFrame = 0;
	};

	/**
	 * @method _updateTimeline
	 * @protected
	 **/
	p._updateTimeline = function()
	{
		var synched = this.mode != MovieClip.INDEPENDENT;

		if (synched)
		{
			this.currentFrame = this.startPosition + (this.mode == MovieClip.SINGLE_FRAME ? 0 : this._synchOffset);
		}

		if (this._prevPos == this.currentFrame)
		{
			return;
		}

		// update timeline position, ignoring actions if this is a graphic.
		var startFrame = this._prevPos < 0 ? 0 : this._prevPos;
		this._setTimelinePosition(startFrame, this.currentFrame, synched ? false : this.actionsEnabled);

		this._prevPos = this.currentFrame;
	};

	p._setTimelinePosition = function(startFrame, currentFrame, doActions)
	{
		//handle all tweens
		var i, j, length, _timelines = this._timelines;
		for (i = _timelines.length - 1; i >= 0; --i)
		{
			var timeline = _timelines[i];
			for (j = 0, length = timeline.length; j < length; ++j)
			{
				var tween = timeline[j];
				//if the tween contains part of the timeline that we are travelling through
				if (currentFrame >= tween.startFrame &&
					currentFrame <= tween.endFrame)
				{
					// set the position within that tween
					//and break the loop to move onto the next timeline
					tween.setPosition(currentFrame);
					break;
				}
			}
		}
		//TODO: handle children removal and adding - try to avoid adding & removing each child
		//each frame the way CreateJS does

		//TODO: go through all children and update synched movieclips that are not single frames

		//handle actions
		if (doActions)
		{
			var actions = this._actions;
			for (i = startFrame, length = Math.min(currentFrame + 1, actions.length); i < length; ++i)
			{
				if (actions[i])
				{
					var frameActions = actions[i];
					for (j = 0; j < frameActions.length; ++j)
						frameActions[j].call(this);
				}
			}
		}
	};

	/**
	 * Adds a child to the timeline, and sets it up as a managed child.
	 * @method _addManagedChild
	 * @param {MovieClip} child The child MovieClip to manage
	 * @param {Number} offset
	 * @private
	 **/
	p._addManagedChild = function(child, offset)
	{
		if (child._off)
		{
			return;
		}
		this.addChildAt(child, 0);

		if (child instanceof MovieClip)
		{
			child._synchOffset = offset;
			child._updateTimeline();
			// TODO: this does not precisely match Flash. Flash loses track of the clip if it is renamed or removed from the timeline, which causes it to reset.
			if (child.mode == MovieClip.INDEPENDENT && child.autoReset && !this._managed[child.id])
			{
				child._reset();
			}
		}
		this._managed[child.id] = 2;
	};

	p.__Container_destroy = p.destroy;
	p.destroy = function(destroyChildren)
	{
		if (this._tickListener)
		{
			SharedTicker.remove(this._tickListener);
			this._tickListener = null;
		}

		this.__Container_destroy(destroyChildren);
	};

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {MovieClip} child The child function
	 * @return {MovieClip} THe child
	 */
	MovieClip.extend = function(child)
	{
		child.prototype = Object.create(p);
		child.prototype.__parent = p;
		child.prototype.constructor = child;
		return child;
	};

	// Assign to namespace
	PIXI.animate.MovieClip = MovieClip;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	// Import libraries
	var Tween = PIXI.animate.Tween;

	// constructor
	/**
	 * The Timeline class represents a
	 * @class Timeline
	 * @param {DisplayObject} Target The target for this string of tweens.
	 * @extends Array
	 * @constructor
	 **/
	function Timeline(target)
	{
		Array.call(this);

		// public properties:
		/**
		 * The target DisplayObject.
		 * @property target
		 * @type DisplayObject
		 **/
		this.target = target;

		/**
		 * Current properties in the tween, to make building the timeline more
		 * efficient.
		 * @property _currentProps
		 * @type Object
		 * @private
		 **/
		this._currentProps = {};
	}

	var p = Timeline.prototype = Object.create(Array.prototype);

	// public methods:
	/**
	 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the normal ticking system)
	 * and managed by this timeline. Adding a tween to multiple timelines will result in unexpected behaviour.
	 * @method addTween
	 * @param tween The tween(s) to add. Accepts multiple arguments.
	 * @return Tween The first tween that was passed in.
	 **/
	p.addTween = function(instance, properties, startFrame, duration, ease)
	{
		//ownership of startProps is passed to the new Tween - this object should not be reused
		var startProps = {};
		var prop;
		//figure out what the starting values for this tween should be
		for (prop in properties)
		{
			//if we have already set that property in an earlier tween, use the ending value
			if (this._currentProps.hasOwnProperty(prop))
				startProps[prop] = this._currentProps[prop];
			//otherwise, get the current value
			else
			{
				var startValue = startProps[prop] = getPropFromShorthand(instance, prop);
				//go through previous tweens to set the value so that when the timeline loops
				//around, the values are set properly - having each tween know what came before
				//allows us to set to a specific frame without running through the entire timeline
				for (var i = this.length - 1; i >= 0; --i)
				{
					this[i].startProps[prop] = startValue;
					this[i].endProps[prop] = startValue;
				}
			}
		}
		//create the new Tween and add it to the list
		var tween = new Tween(instance, startProps, properties, startFrame, duration, ease);
		this.push(tween);
		//update starting values for the next tween - if tweened values included "p", then Tween
		//parsed that to add additional data that is required
		properties = tween.endProps;
		for (prop in properties)
		{
			this._currentProps[prop] = properties[prop];
		}
	};

	function getPropFromShorthand(target, prop)
	{
		switch (prop)
		{
			case "x":
				return target.position.x;
			case "y":
				return target.position.y;
			case "sx":
				return target.scale.x;
			case "sy":
				return target.scale.y;
			case "kx":
				return target.skew.x;
			case "ky":
				return target.skew.y;
			case "r":
				return target.rotation;
			case "a":
				return target.alpha;
			case "t":
				return target.tint;
			case "v":
				//visibility isn't actually tweened anyway
				return target.visible;
			case "m":
				//mask isn't actually tweened anyway
				return target.mask;
				//g: null,//not sure if we'll actually handle graphics this way?
			case "p":
				//playback mode/frame isn't tweened but we need to provide the original values
				//in theory this should only be used to get the value from the first frame, so
				//we are hard coding the parent's starting position at 0.
				return {
					m: target.mode,
					sp: target.startPosition,
					parentSP: 0
				};
		}
	}

	// Assign to namespace
	PIXI.animate.Timeline = Timeline;

}(PIXI));
(function(PIXI)
{
	var Tween = function(target, startProps, endProps, startFrame, duration, ease)
	{
		//target display object
		this.target = target;

		//properties at the start of the tween
		this.startProps = startProps;

		//properties at the end of the tween, as well as any properties that are set
		//instead of tweened
		this.endProps = {};
		var prop;

		//make a copy to safely include any unchanged values from the start of the tween
		for (prop in endProps)
		{
			this.endProps[prop] = endProps[prop];
			//for a synchronized movieclip, add additional data so we always know that it is correct
			if (prop == "p")
			{
				this.endProps.p.parentSP = startFrame;
			}
		}

		//copy in any starting properties don't change
		for (prop in startProps)
		{
			if (!this.endProps.hasOwnProperty(prop))
				this.endProps[prop] = startProps[prop];
		}
		//duration of tween in frames. For a keyframe with no tweening, the duration
		//will be 0.
		this.duration = duration;

		//the frame that the tween starts on
		this.startFrame = startFrame;

		//the frame that the tween ends on
		this.endFrame = startFrame + duration;

		//easing function to use, if any
		this.ease = ease;
	};

	// Reference to the prototype
	var p = Tween.prototype;

	//standard tweening
	function lerpValue(start, end, t)
	{
		return start + (end - start) * t;
	}

	//split r, g, b into separate values for tweening
	function lerpColor(start, end, t)
	{
		//split start color into components
		var sR = start >> 16 & 0xFF;
		var sG = start >> 8 & 0xFF;
		var sB = start & 0xFF;
		//split end color into components
		var eR = end >> 16 & 0xFF;
		var eG = end >> 8 & 0xFF;
		var eB = end & 0xFF;
		//lerp red
		var r = sR + (eR - sR) * percent;
		//clamp red to valid values
		if (r < 0)
			r = 0;
		else if (r > 255)
			r = 255;
		//lerp green
		var g = sG + (eG - sG) * percent;
		//clamp green to valid values
		if (g < 0)
			g = 0;
		else if (g > 255)
			g = 255;
		//lerp blue
		var b = sB + (eB - sB) * percent;
		//clamp blue to valid values
		if (b < 0)
			b = 0;
		else if (b > 255)
			b = 255;

		var combined = (r << 16) | (g << 8) | b;
		return combined;
	}

	var PI = Math.PI;
	var TWO_PI = PI * 2;

	//handle 355 -> 5 degrees only going through a 10 degree change instead of
	//the long way around
	//Math from http://stackoverflow.com/a/2708740
	function lerpRotation(start, end, t)
	{
		var difference = Math.abs(end - start);
		if (difference > PI)
		{
			// We need to add on to one of the values.
			if (end > start)
			{
				// We'll add it on to start...
				start += TWO_PI;
			}
			else
			{
				// Add it on to end.
				end += PI + TWO_PI;
			}
		}

		// Interpolate it.
		var value = (start + ((end - start) * t));

		// wrap to 0-2PI
		/*if (value >= 0 && value <= TWO_PI)
			return value;
		return value % TWO_PI;*/

		//just return, as it's faster
		return value;
	}

	Tween.propDict = {
		//position
		x: lerpValue,
		y: lerpValue,
		//scale
		sx: lerpValue,
		sy: lerpValue,
		//skew
		kx: lerpValue,
		ky: lerpValue,
		//rotation
		r: lerpRotation,
		//alpha
		a: lerpValue,
		//tinting
		t: lerpColor,
		//values to be set
		v: null, //visible
		m: null, //mask
		g: null, //not sure if we'll actually handle graphics this way?
		p: null // (Flash) Graphic position/mode
	};

	p.setPosition = function(currentFrame)
	{
		//if this is a single frame with no tweening, or at the end of the tween, then
		//just speed up the process by setting values
		if (currentFrame >= this.endFrame)
		{
			this.setToEnd();
			return;
		}

		var time = (currentFrame - this.startFrame) / this.duration;
		if (this.ease)
			time = this.ease(time);
		var startProps = this.startProps;
		var endProps = this.endProps;
		for (var prop in endProps)
		{
			var lerp = Tween.propDict[prop];
			if (lerp)
				setPropFromShorthand(target, prop, lerp(startProps[prop], endProps[prop], time));
		}
	};

	p.setToEnd = function()
	{
		var endProps = this.endProps;
		for (var prop in endProps)
		{
			setPropFromShorthand(target, prop, endProps[prop]);
		}
	};

	function setPropFromShorthand(target, prop, value)
	{
		switch (prop)
		{
			case "x":
				target.position.x = value;
				break;
			case "y":
				target.position.y = value;
				break;
			case "sx":
				target.scale.x = value;
				break;
			case "sy":
				target.scale.y = value;
				break;
			case "kx":
				target.skew.x = value;
				break;
			case "ky":
				target.skew.y = value;
				break;
			case "r":
				target.rotation = value;
				break;
			case "a":
				target.alpha = value;
				break;
			case "t":
				target.tint = value;
				break;
			case "v":
				target.visible = value;
				break;
			case "m":
				target.mask = value;
				break;
				//g: null,//not sure if we'll actually handle graphics this way?
			case "p":
				if (value)
				{
					target.mode = value.m;
					target.startPosition = value.sp;
					target.parentStartPosition = value.parentSP;
				}
				else
				{
					//TODO: clear target mode/start position (make it an independent movieclip)
				}
				break;
		}
	}


	// Assign to namespace
	PIXI.animate.Tween = Tween;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Container
	 */
	var p = PIXI.Container.prototype;

	/**
	 * Shortcut for addChild.
	 * @method ac
	 * @param {*} [child*] N-number of children
	 * @return {Container} Instance of this container
	 */
	p.ac = p.addChild;

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {Container} child The child function
	 * @return {Container} THe child
	 */
	PIXI.Container.extend = function(child)
	{
		child.prototype = Object.create(p);
		child.prototype.__parent = p;
		child.prototype.constructor = child;
		return child;
	};

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI)
{
	/**
	 * @class DisplayObject
	 */
	var p = PIXI.DisplayObject.prototype;

	/**
	 * Function to see if this is renderable or not. Useful for setting masks.
	 * @method setRenderable
	 * @param  {Boolean} [renderable=false] Make renderable
	 * @return {Graphics}
	 */
	/**
	 * Shortcut to setRenderable.
	 * @method re
	 * @param  {Boolean} [renderable=false] Make renderable
	 * @return {Graphics}
	 */
	p.setRenderable = p.re = function(renderable)
	{
		this.renderable = !!renderable;
		return this;
	};

	/**
	 * Shortcut for setTransform.
	 * @method tr
	 * @param {Number} x The X position
	 * @param {Number} y The Y position
	 * @param {Number} scaleX The X Scale value
	 * @param {Number} scaleY The Y Scale value
	 * @param {Number} skewX The X skew value
	 * @param {Number} skewY The Y skew value
	 * @param {Number} pivotX The X pivot value
	 * @param {Number} pivotY The Y pivot value
	 * @return {DisplayObject} Instance for chaining
	 */
	p.tr = p.setTransform;

	/**
	 * Setter for mask to be able to chain.
	 * @method setMask
	 * @param {PIXI.Graphics} mask The mask shape to use
	 * @return {DisplayObject} Instance for chaining
	 */
	/**
	 * Shortcut for setMask.
	 * @method ma
	 * @param {PIXI.Graphics} mask The mask shape to use
	 * @return {DisplayObject} Instance for chaining
	 */
	p.setMask = p.ma = function(mask)
	{
		this.mask = mask;
		return this;
	};

	/**
	 * Set the tint values by color.
	 * @method setTint
	 * @param {Number} r The red percentage value
	 * @param {Number} g The green percentage value
	 * @param {Number} b The blue percentage value
	 * @return {DisplayObject} Object for chaining
	 */
	/**
	 * Shortcut to setTint.
	 * @method tn
	 * @param {Number} ting The red percentage value
	 * @return {DisplayObject} Object for chaining
	 */
	p.setTint = p.tn = function(tint)
	{
		this.tint = tint;
		return this;
	};

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {DisplayObject} child The child function
	 * @return {DisplayObject} THe child
	 */
	PIXI.DisplayObject.extend = function(child)
	{
		child.prototype = Object.create(p);
		child.prototype.__parent = p;
		child.prototype.constructor = child;
		return child;
	};

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Graphics
	 */
	var p = PIXI.Graphics.prototype;

	/**
	 * Shortcut for drawCommands.
	 * @method d
	 * @param  {Array} commands The commands and parameters to draw
	 * @return {Graphics}
	 */
	/**
	 * Execute a series of commands, this is the name of the short function
	 * followed by the parameters, e.g., `["f", "#ff0000", "r", 0, 0, 100, 200]`
	 * @method drawCommands
	 * @param  {Array} commands The commands and parameters to draw
	 * @return {Graphics}
	 */
	p.drawCommands = p.d = function(commands)
	{
		var currentCommand, params = [],
			i = 0;

		while (i <= commands.length)
		{
			var item = commands[i++];
			if (item === undefined || this[item])
			{
				if (currentCommand)
				{
					this[currentCommand].apply(this, params);
					params.length = 0;
				}
				currentCommand = item;
			}
			else
			{
				// convert colors to int
				if (/^#/.test(item))
					item = parseInt(item.substr(1), 16);
				params.push(item);
			}
		}
		return this;
	};

	/**
	 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
	 * since the fill or stroke was last set.
	 * @method cp
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.cp = p.closePath;

	/**
	 * Alias for addHole
	 * @method ch
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.ah = p.addHole;

	/**
	 * Shortcut to moveTo.
	 * @method mt
	 * @param {Number} x The x coordinate the drawing point should move to.
	 * @param {Number} y The y coordinate the drawing point should move to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls).
	 **/
	p.mt = p.moveTo;

	/**
	 * Shortcut to lineTo.
	 * @method lt
	 * @param {Number} x The x coordinate the drawing point should draw to.
	 * @param {Number} y The y coordinate the drawing point should draw to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.lt = p.lineTo;

	/**
	 * Shortcut to bezierCurveTo.
	 * @method bt
	 * @param {Number} cp1x
	 * @param {Number} cp1y
	 * @param {Number} cp2x
	 * @param {Number} cp2y
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.bt = p.bezierCurveTo;

	/**
	 * Shortcut to drawRect.
	 * @method dr
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	/**
	 * Shortcut to drawRect.
	 * @method r
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.dr = p.r = p.drawRect;

	/**
	 * Shortcut to drawRoundedRect.
	 * @method rr
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @param {Number} radius The corner radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rr = p.drawRoundedRect;

	/**
	 * Shortcut to beginFill.
	 * @method f
	 * @param {Uint} color The hex color value (e.g. 0xFFFFFF)
	 * null will result in no fill.
	 * @param {Number} [alpha=1] The alpha value of fill
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.f = p.beginFill;

	/**
	 * Shortcut to lineStyle.
	 * @method s
	 * @param {String} color A CSS compatible color value (ex. "#FF0000", "red", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no stroke.
	 * @param {Number} [thickness=1] The thickness of the stroke
	 * @param {Number} [alpha=1] The alpha value from 0 (invisibile) to 1 (visible)
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.s = p.lineStyle;

	/**
	 * Shortcut to drawRoundedRect.
	 * @method rc
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @param {Number} radiusTL The top left corner radius
	 * @param {Number} radiusTR The top right corner radius
	 * @param {Number} radiusBR The bottom right corner radius
	 * @param {Number} radiusBL The bottom left corner radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rc = p.drawRoundedRect;

	/**
	 * Shortcut to drawCircle.
	 * @method dc
	 * @param {Number} x x coordinate center point of circle.
	 * @param {Number} y y coordinate center point of circle.
	 * @param {Number} radius Radius of circle.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.dc = p.drawCircle;

	/**
	 * Shortcut to arc.
	 * @method a
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 * @param {Number} startAngle Measured in radians.
	 * @param {Number} endAngle Measured in radians.
	 * @param {Boolean} anticlockwise
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.a = p.arc;

	/**
	 * Shortcut to arcTo.
	 * @method at
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} x2
	 * @param {Number} y2
	 * @param {Number} radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.at = p.arcTo;

	/**
	 * Shortcut to drawEllipse.
	 * @method  de
	 * @param  {Number} x      [description]
	 * @param  {Number} y      [description]
	 * @param  {Number} width  [description]
	 * @param  {Number} height [description]
	 */
	p.de = p.drawEllipse;

	/**
	 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
	 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
	 * whatwg spec</a>. A tiny API method "qt" also exists.
	 * @method qt
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.qt = p.quadraticCurveTo;

	/**
	 * Placeholder method for a linear fill. Pixi does not support linear fills,
	 * so we just pick the first color in colorArray
	 * @method lf
	 * @param {Array} colorArray An array of CSS compatible color values @see `f`
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.lf = function(colorArray)
	{
		if (true)
		{
			console.warn("Linear gradient fills are not supported");
		}
		return this.f(colorArray[0]);
	};

	/**
	 * Placeholder method for a radial fill. Pixi does not support radial fills,
	 * so we just pick the first color in colorArray
	 * @method rf
	 * @param {Array} colorArray An array of CSS compatible color values @see `f`
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rf = function(colorArray)
	{
		if (true)
		{
			console.warn("Radial gradient fills are not supported");
		}
		return this.f(colorArray[0]);
	};

	/**
	 * Placeholder method for a beginBitmapFill. Pixi does not support bitmap fills.
	 * @method bf
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.bf = function()
	{
		if (true)
		{
			console.warn("Bitmap fills are not supported");
		}
		return this.f(0x0);
	};

	/**
	 * Placeholder method for a setStrokeDash. Pixi does not support dashed strokes.
	 * @method sd
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.sd = function()
	{
		if (true)
		{
			console.warn("Dashed strokes are not supported");
		}
		return this;
	};

	/**
	 * Placeholder method for a beginBitmapStroke. Pixi does not support bitmap strokes.
	 * @method bs
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.bs = function()
	{
		if (true)
		{
			console.warn("Bitmap strokes are not supported");
		}
		return this;
	};

	/**
	 * Placeholder method for a beginLinearGradientStroke. Pixi does not support gradient strokes.
	 * @method ls
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.ls = function()
	{
		if (true)
		{
			console.warn("Linear gradient strokes are not supported");
		}
		return this;
	};

	/**
	 * Placeholder method for a beginRadialGradientStroke. Pixi does not support gradient strokes.
	 * @method rs
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rs = function()
	{
		if (true)
		{
			console.warn("Radial gradient strokes are not supported");
		}
		return this;
	};

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Sprite
	 */
	var p = PIXI.Sprite.prototype;

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {Sprite} child The child function
	 * @return {Sprite} THe child
	 */
	PIXI.Sprite.extend = function(child)
	{
		child.prototype = Object.create(p);
		child.prototype.__parent = p;
		child.prototype.constructor = child;
		return child;
	};

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Text
	 */
	var p = PIXI.Text.prototype;

	/**
	 * Setter for the alignment, also sets the anchor point
	 * to make sure the positioning is correct.
	 * @method setAlign
	 * @param {String} align Either, center, right, left
	 * @return {Text} For chaining
	 */
	/**
	 * Shortcut for setAlign.
	 * @method al
	 * @param {String} align Either, center, right, left
	 * @return {Text} For chaining
	 */
	p.setAlign = p.al = function(align)
	{
		this.style.align = align || "left";
		var x = 0;
		switch (align)
		{
			case "center":
				x = 0.5;
				break;
			case "right":
				x = 1;
				break;
		}
		this.anchor.x = x;
		return this;
	};

	/**
	 * Initial setting of the drop shadow.
	 * @method setShadow
	 * @param {String} [color="#000000"] The color to set
	 * @param {Number} [angle=Math.PI/4] The angle of offset, in radians
	 * @param {Number} [distance=5] The offset distance
	 * @return {Text} For chaining
	 */
	/**
	 * Shortcut for setShadow.
	 * @method sh
	 * @param {String} [color="#000000"] The color to set
	 * @param {Number} [angle=Math.PI/4] The angle of offset, in radians
	 * @param {Number} [distance=5] The offset distance
	 * @return {Text} For chaining
	 */
	p.setShadow = p.sh = function(color, angle, distance)
	{
		var style = this.style;
		style.dropShadow = true;

		// Convert color to hex string
		if (color !== undefined)
		{
			color = "#" + color.toString(16);
		}
		style.dropShadowColor = isUndefinedOr(color, style.dropShadowColor);
		style.dropShadowAngle = isUndefinedOr(angle, style.dropShadowAngle);
		style.dropShadowDistance = isUndefinedOr(distance, style.dropShadowDistance);
		return this;
	};

	/**
	 * Check if a value is undefined, fallback to default value
	 * @method isUndefinedOr 
	 * @private
	 * @param {*} value The value to check
	 * @param {*} defaultValue The default value if value is undefined
	 * @return {*} The either the value or the default value
	 */
	var isUndefinedOr = function(value, defaultValue)
	{
		return value === undefined ? defaultValue : value;
	};

}(PIXI));