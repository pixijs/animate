/*! PixiAnimate 0.3.4 */
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function()
{
	// Check for window, fallback to global
	var global = typeof window !== 'undefined' ? window : GLOBAL;

	// Define PIXI Flash namespace
	var animate = {};

	// Export for Node-compatible environments like Electron
	if (typeof module !== 'undefined' && module.exports)
	{
		// Attempt to require the pixi module
		if (typeof PIXI === 'undefined')
		{
			// Include the Pixi.js module
			require('pixi.js');
		}

		// Export the module
		module.exports = animate;
	}
	// If we're in the browser make sure PIXI is available 
	else if (typeof PIXI === 'undefined')
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

	// Assign to global namespace
	global.PIXI.animate = animate;

}());
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI, undefined)
{
	/**
	 * @class load
	 * @description Entry point for loading Adobe Animate exports:
	 * 
	 * **Load and auto-add to parent**
	 * ```
	 * var renderer = new PIXI.autoDetectRenderer(1280, 720);
	 * var stage = new PIXI.Container();
	 * PIXI.animate.load(lib.MyStage, stage);
	 * function update() {
	 *      renderer.render(stage);
	 *      update();
	 * }
	 * update();
	 * ```
	 * **Load and handle with callback**
	 * ```
	 * var renderer = new PIXI.autoDetectRenderer(1280, 720);
	 * var stage = new PIXI.Container();
	 * PIXI.animate.load(lib.MyStage, function(instance){
	 *     stage.addChild(instance);
	 * });
	 * function update() {
	 *      renderer.render(stage);
	 *      update();
	 * }
	 * update();
	 * ```
	 */
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageRef Reference to the stage class
	 * @param {Array} [StageRef.assets] Assets used to preload
	 * @param {PIXI.Container} parent The Container to auto-add the stage to.
	 * @param {Function} [complete] Function to call when complete
	 * @param {String} [assetBaseDir] Base root directory
	 */
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageRef Reference to the stage class
	 * @param {Array} [StageRef.assets] Assets used to preload
	 * @param {PIXI.Container} parent The Container to auto-add the stage to.
	 * @param {String} [assetBaseDir] Base root directory
	 */
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageRef Reference to the stage class
	 * @param {Array} [StageRef.assets] Assets used to preload
	 * @param {Function} complete The callback function when complete.
	 * @param {String} [assetBaseDir] Base root directory
	 */
	var load = function(StageRef, parent, complete, assetBaseDir)
	{
		// Support arguments (ref, complete, assetBaseDir)
		if (typeof parent == "function")
		{
			assetBaseDir = complete;
			complete = parent;
			parent = null;
		}
		else
		{
			if (typeof complete == "string")
			{
				assetBaseDir = complete;
				complete = null;
			}
		}

		// Root load directory
		assetBaseDir = assetBaseDir || "";

		var assets = StageRef.assets || [];
		var loader = new PIXI.loaders.Loader();

		function done()
		{
			var stage = new StageRef();
			if (parent)
			{
				parent.addChild(stage);
			}
			if (complete)
			{
				complete(stage);
			}
		}

		// Check for assets to preload
		if (assets && assets.length)
		{
			// assetBaseDir can accept either with trailing slash or not
			if (assetBaseDir) assetBaseDir += "/";

			for (var asset, i = 0; i < assets.length; i++)
			{
				asset = assets[i];
				if (Array.isArray(asset))
				{
					loader.add(asset[0], assetBaseDir + asset[1]);
				}
				else
				{
					loader.add(assetBaseDir + asset);
				}
			}
			loader.once('complete', done)
				.load();
		}
		else
		{
			// tiny case where there's only text and no shapes/animations
			done();
		}
	};

	// Assign to namespace
	PIXI.animate.load = load;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	/**
	 * @class ColorUtils
	 * @private
	 * @description For converting colors
	 */
	var ColorUtils = {};

	/**
	 * Convert the Hexidecimal string (e.g., "#fff") to uint
	 * @static
	 * @private
	 * @method hexToUint
	 */
	ColorUtils.hexToUint = function(hex)
	{
		// Remove the hash
		hex = hex.substr(1);

		// Convert shortcolors fc9 to ffcc99
		if (hex.length == 3)
		{
			hex = hex.replace(/([a-f0-9])/g, '$1$1');
		}
		return parseInt(hex, 16);
	};

	// Assign to namespace
	PIXI.animate.ColorUtils = ColorUtils;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	// Import classes
	var ColorUtils = PIXI.animate.ColorUtils;

	/**
	 * Contains the collection of graphics data
	 * @class ShapesCache
	 */
	var ShapesCache = {};

	/**
	 * Add an item or itesm to the cache
	 * @method add
	 * @static
	 * @param {String} prop  The id of graphic
	 * @param {Array} [value] If adding a single property, the draw commands
	 */
	Object.defineProperty(ShapesCache, "add",
	{
		enumerable: false,
		value: function(prop, draw)
		{
			// Convert all hex string colors (animate) to int (pixi.js)
			for (var d in draw)
			{
				var arg = draw[d];
				if (typeof arg == "string" && arg[0] == "#")
				{
					draw[d] = ColorUtils.hexToUint(arg);
				}
			}
			ShapesCache[prop] = draw;
		}
	});

	/**
	 * Decode a shapes string into draw commands
	 * @method decode
	 * @static
	 * @param  {String} str The string to decode
	 */
	Object.defineProperty(ShapesCache, "decode",
	{
		enumerable: false,
		value: function(str)
		{
			// each shape is a new line
			var shapes = str.split("\n");
			var isCommand = /^[a-z]{1,2}$/;
			for (var i = 0; i < shapes.length; i++)
			{
				var shape = shapes[i].split(" "); // arguments are space separated
				var name = shape.shift(); // first argument is the ID
				for (var j = 0; j < shape.length; j++)
				{
					// Convert all numbers to floats, ignore colors
					var arg = shape[j];
					if (arg[0] != "#" && !isCommand.test(arg))
					{
						shape[j] = parseFloat(arg);
					}
				}
				this.add(name, shape);
			}
		}
	});

	/**
	 * Get the graphic from cache
	 * @method  fromCache
	 * @static
	 * @param  {String} id The cache id
	 * @return {Array} Series of graphic draw commands
	 */
	Object.defineProperty(ShapesCache, "fromCache",
	{
		enumerable: false,
		value: function(id)
		{
			return ShapesCache[id] || null;
		}
	});

	/**
	 * Remove the graphic from cache
	 * @method  remove
	 * @static
	 * @param  {String} id The cache id
	 */
	Object.defineProperty(ShapesCache, "remove",
	{
		enumerable: false,
		value: function(id)
		{
			if (ShapesCache[id])
			{
				ShapesCache[id].length = 0;
				delete ShapesCache[id];
			}
		}
	});

	/**
	 * Remove all graphics from cache
	 * @method  removeAll
	 * @static
	 */
	Object.defineProperty(ShapesCache, "removeAll",
	{
		enumerable: false,
		value: function()
		{
			for (var id in ShapesCache)
			{
				ShapesCache.remove(id);
			}
		}
	});

	// Assign to namespace
	PIXI.animate.ShapesCache = ShapesCache;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	var ShapesCache = PIXI.animate.ShapesCache;
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
			var url = resource.url;
			var data = resource.data;

			if (/\.shapes\.txt$/i.test(url))
			{
				ShapesCache.decode(data);
			}
			else if (/\.shapes.json$/i.test(url))
			{
				for (var name in data)
				{
					ShapesCache.add(name, data[name]);
				}
			}
			else if (data.nodeName && data.nodeName == "IMG")
			{
				// Add individual images to the texture cache by their
				// short symbol name, not the URL
				Texture.addTextureToCache(
					Texture.fromFrame(url),
					resource.name
				);
			}
			next();
		};
	};

	// Assign to the loader
	Loader.addPixiMiddleware(SymbolLoader);

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
		// t: lerpColor,
		t: null,
		//values to be set
		v: null, //visible
		c: null, //colorTransform
		m: null, //mask
		g: null //not sure if we'll actually handle graphics this way?
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
		var target = this.target;
		var startProps = this.startProps;
		var endProps = this.endProps;
		for (var prop in endProps)
		{
			var lerp = Tween.propDict[prop];
			if (lerp)
				setPropFromShorthand(target, prop, lerp(startProps[prop], endProps[prop], time));
			else
				setPropFromShorthand(target, prop, startProps[prop]);
		}
	};

	p.setToEnd = function()
	{
		var endProps = this.endProps;
		var target = this.target;
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
				target.i(value); // i = setTint
				break;
			case "c":
				target.c.apply(target, value); // c = setColorTransform
				break;
			case "v":
				target.visible = value;
				break;
			case "m":
				target.ma(value);
				break;
		}
	}

	// Assign to namespace
	PIXI.animate.Tween = Tween;

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
			case "v":
				return target.visible;
			case "m":
				return target.mask;
				// case "t":
				//   return target.tint;
				//not sure if we'll actually handle graphics this way?
				//g: return null;
		}
		return null;
	}

	// Assign to namespace
	PIXI.animate.Timeline = Timeline;

}(PIXI));
/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI, undefined)
{
	var Container = PIXI.Container;
	var DisplayObject = PIXI.DisplayObject;
	var Timeline = PIXI.animate.Timeline;
	var Tween = PIXI.animate.Tween;
	var ColorUtils = PIXI.animate.ColorUtils;
	var SharedTicker = PIXI.ticker.shared;

	/**
	 * Provide timeline playback of movieclip
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
	var MovieClip = function(options, duration, loop, framerate, labels)
	{
		Container.call(this);

		// Default options
		options = options === undefined ?
		{} : options;

		// Options can also be the mode
		if (typeof options == "number")
		{
			options = {
				mode: options || MovieClip.INDEPENDENT,
				duration: duration || 0,
				loop: loop === undefined ? true : loop,
				labels: labels ||
				{},
				framerate: framerate || 0
			};
		}
		else
		{
			// Apply defaults to options
			options = Object.assign(
			{
				mode: MovieClip.INDEPENDENT,
				startPosition: 0,
				loop: true,
				labels:
				{},
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
		 **/
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

		this._labels = [];
		this._labelDict = options.labels;
		if (options.labels)
		{
			for (var name in options.labels)
			{
				var label = {
					label: name,
					position: options.labels[name]
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
		 **/
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

		if (options.framerate)
		{
			this.framerate = options.framerate;
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
		this.advance(seconds);
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

	Object.defineProperties(p,
	{
		/**
		 * When the MovieClip is framerate independent, this is the time elapsed from frame 0 in seconds.
		 * @property elapsedTime
		 * @type Number
		 * @default 0
		 * @public
		 */
		elapsedTime:
		{
			get: function()
			{
				return this._t;
			},
			set: function(value)
			{
				this._t = value;
			}
		},

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
		framerate:
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
					this._duration = value ? this._totalFrames / value : 0;
				}
				else
					this._framerate = this._duration = 0;
			}
		},

		/**
		 * Get the total number of frames (duration) of this MovieClip
		 * @property totalFrames
		 * @type {Number}
		 * @default 0
		 * @readOnly
		 **/
		totalFrames:
		{
			get: function()
			{
				return this._totalFrames;
			}
		}
	});

	/**
	 * Convenience method for setting multiple frames at once and adding the child
	 * @method addKeyframes
	 * @private
	 * @param {PIXI.DisplayObject} instance The clip to animate
	 * @param {Object} keyframes The collection of keyframe objects or data string, the key is frame number
	 */
	p.addKeyframes = function(instance, keyframes)
	{
		if (!keyframes) return;

		var i = 0;

		// Parse the value of the compressed keyframe
		var parseValue = function(frame, prop, buffer)
		{
			switch (prop)
			{
				case "c":
					{
						buffer = buffer.split(',');
						buffer.forEach(function(val, i, buffer)
						{
							buffer[i] = parseFloat(val);
						});
						frame.c = buffer;
						break;
					}
				case "t":
					{
						frame.t = buffer;
						break;
					}
				case "v":
					{
						frame.v = !!parseInt(buffer);
						break;
					}
				default:
					{
						frame[prop] = parseFloat(buffer);
						break;
					}
			}
		};

		// Convert serialized array into keyframes
		// "0x100y100,1x150" to: { "0": {"x":100, "y": 100}, "1": {"x": 150} }
		if (typeof keyframes == "string")
		{
			var result = {};
			var keysMap = {
				X: 'x', // x position
				Y: 'y', // y position
				A: 'sx', // scale x
				B: 'sy', // scale y
				C: 'kx', // skew x
				D: 'ky', // skew y
				R: 'r', // rotation
				L: 'a', // alpha
				T: 't', // tint
				F: 'c', // colorTransform
				V: 'v' // visibility
			};
			var c,
				buffer = "",
				isFrameStarted = false,
				prop,
				frame = {};

			while (i < keyframes.length)
			{
				c = keyframes[i];
				if (keysMap[c])
				{
					if (!isFrameStarted)
					{
						isFrameStarted = true;
						result[buffer] = frame;
					}
					if (prop)
					{
						parseValue(frame, prop, buffer);
					}
					prop = keysMap[c];
					buffer = "";
					i++;
				}
				// Start a new prop
				else if (c === " ")
				{
					i++;
					parseValue(frame, prop, buffer);
					buffer = "";
					prop = null;
					frame = {};
					isFrameStarted = false;
				}
				else
				{
					buffer += c;
					i++;
				}
			}
			keyframes = result;
		}

		// Convert the keyframes object into
		// individual properties
		for (i in keyframes)
		{
			this.addTween(instance, keyframes[i], parseInt(i, 10));
		}
	};

	/**
	 * Add mask or masks
	 * @method addTimedMask
	 * @param {PIXI.DisplayObject} instance Instance to mask
	 * @param {Object} keyframes The map of frames to mask objects
	 * @return {PIXI.animate.MovieClip} instance of clip for chaining
	 */
	/**
	 * Shortcut alias for `addTimedMask`
	 * @method am
	 * @param {PIXI.DisplayObject} instance Instance to mask
	 * @param {Object} keyframes The map of frames to mask objects
	 * @return {PIXI.animate.MovieClip} instance of clip for chaining
	 */
	p.addTimedMask = p.am = function(instance, keyframes)
	{
		for (var i in keyframes)
		{
			this.addTween(instance,
			{
				m: keyframes[i]
			}, parseInt(i, 10));
		}

		// Set the initial position/add
		this._setTimelinePosition(this.currentFrame, this.currentFrame, true);
		return this;
	};

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
	/**
	 * Alias for method `addTween`
	 * @method tw
	 * @return {MovieClip}
	 */
	p.tw = p.addTween = function(instance, properties, startFrame, duration, ease)
	{
		duration = duration || 0;

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

		// Convert any string colors to uints
		if (typeof properties.t == "string")
		{
			properties.t = ColorUtils.hexToUint(properties.t);
		}
		else if (typeof properties.v == "number")
		{
			properties.v = !!properties.v;
		}

		//2. create the tween segment, recording the starting values of properties and using the
		//   supplied properties as the ending values
		timeline.addTween(instance, properties, startFrame, duration, ease);
		if (this._totalFrames < startFrame + duration)
			this._totalFrames = startFrame + duration;
		return this;
	};

	/**
	 * Add a child to show for a certain number of frames before automatic removal.
	 * @method addTimedChild
	 * @param {PIXI.DisplayObject} instance The clip to show
	 * @param {int} startFrame The starting frame
	 * @param {int} [duration=1] The number of frames to display the child before removing it.
	 * @param {String|Array} [keyframes] The collection of static keyframes to add
	 * @return {MovieClip}
	 */
	/**
	 * Alias for method `addTimedChild`
	 * @method at
	 * @return {MovieClip}
	 */
	p.at = p.addTimedChild = function(instance, startFrame, duration, keyframes)
	{
		if (startFrame == null) // jshint ignore:line
			startFrame = 0;
		if (duration == null || duration < 1) // jshint ignore:line
			duration = this._totalFrames || 1;

		// Add the starting offset for synced movie clips
		if (instance.mode === MovieClip.SYNCHED)
		{
			instance.parentStartPosition = startFrame;
		}

		//add tweening info about this child's presence on stage
		//when the child is (re)added, if it has 'autoReset' set to true, then it
		//should be set back to frame 0
		var timeline, i;
		//get existing timeline
		for (i = this._timedChildTimelines.length - 1; i >= 0; --i)
		{
			if (this._timedChildTimelines[i].target == instance)
			{
				timeline = this._timedChildTimelines[i];
				break;
			}
		}
		//if there wasn't one, make a new one
		if (!timeline)
		{
			timeline = [];
			timeline.target = instance;
			this._timedChildTimelines.push(timeline);
		}
		//ensure that the timeline is long enough
		var oldLength = timeline.length;
		if (oldLength < startFrame + duration)
		{
			timeline.length = startFrame + duration;
			//fill any gaps with false to denote that the child should be removed for a bit
			if (oldLength < startFrame)
			{
				//if the browser has implemented the ES6 fill() function, use that
				if (timeline.fill)
					timeline.fill(false, oldLength, startFrame);
				else
				{
					//if we can't use fill, then do a for loop to fill it
					for (i = oldLength; i < startFrame; ++i)
						timeline[i] = false;
				}
			}
		}
		//if the browser has implemented the ES6 fill() function, use that
		if (timeline.fill)
			timeline.fill(true, startFrame, startFrame + duration);
		else
		{
			var length = timeline.length;
			//if we can't use fill, then do a for loop to fill it
			for (i = startFrame; i < length; ++i)
				timeline[i] = true;
		}
		if (this._totalFrames < startFrame + duration)
			this._totalFrames = startFrame + duration;

		// Add the collection of keyframes
		this.addKeyframes(instance, keyframes);

		// Set the initial position/add
		this._setTimelinePosition(startFrame, this.currentFrame, true);

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
		var actions = this._actions;
		//ensure that the movieclip timeline is long enough to support the target frame
		if (actions.length <= startFrame)
			actions.length = startFrame + 1;
		if (this._totalFrames < startFrame)
			this._totalFrames = startFrame;
		//add the action
		if (actions[startFrame])
		{
			actions[startFrame].push(callback);
		}
		else
		{
			actions[startFrame] = [callback];
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
		if (this.currentFrame >= this._totalFrames)
			this.currentFrame = this._totalFrames - 1;
		//update all tweens & actions in the timeline
		this._updateTimeline();
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
			if (this.currentFrame >= this._totalFrames)
				this.currentFrame %= this._totalFrames;
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

	/**
	 * Set the timeline position
	 * @method _setTimelinePostion
	 * @protected
	 * @param {int} startFrame
	 * @param {int} currentFrame
	 * @param {Boolean} doActions
	 */
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
		var _timedChildTimelines = this._timedChildTimelines;
		for (i = 0, length = _timedChildTimelines.length; i < length; ++i)
		{
			var target = _timedChildTimelines[i].target;
			var shouldBeChild = _timedChildTimelines[i][currentFrame];
			//if child should be on stage and is not:
			if (shouldBeChild && target.parent != this)
			{
				this.addChild(target);
				if (target.mode == MovieClip.INDEPENDENT && target.autoReset)
					target._reset();
			}
			else if (!shouldBeChild && target.parent == this)
			{
				this.removeChild(target);
			}
		}

		//go through all children and update synched movieclips that are not single frames
		var children = this.children,
			child;
		for (i = 0, length = children.length; i < length; ++i)
		{
			child = children[i];
			if (child.mode == MovieClip.SYNCHED)
			{
				child._synchOffset = currentFrame - child.parentStartPosition;
				child._updateTimeline();
			}
		}

		//handle actions
		if (doActions)
		{
			var actions = this._actions;
			//handle looping around
			var needsLoop = false;
			if (currentFrame < startFrame)
			{
				length = actions.length;
				needsLoop = true;
			}
			else
				length = Math.min(currentFrame + 1, actions.length);
			for (i = startFrame, length = Math.min(currentFrame + 1, actions.length); i < length; ++i)
			{
				if (actions[i])
				{
					var frameActions = actions[i];
					for (j = 0; j < frameActions.length; ++j)
						frameActions[j].call(this);
				}
				//handle looping around
				if (needsLoop && i == length - 1)
				{
					i = 0;
					length = currentFrame + 1;
					needsLoop = false;
				}
			}
		}
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
	MovieClip.extend = MovieClip.e = function(child)
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
	PIXI.Container.extend = PIXI.Container.e = function(child)
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
	 * @class DisplayObject
	 */
	var p = PIXI.DisplayObject.prototype;

	// Color Matrix filter
	var ColorMatrixFilter;
	if (PIXI.filters)
	{
		ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
	}

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
	p.t = p.setTransform;

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
		// According to PIXI, only Graphics and Sprites can 
		// be used as mask, let's ignore everything else, like other
		// movieclips and displayobjects/containers
		if (mask)
		{
			if (!(mask instanceof PIXI.Graphics) && !(mask instanceof PIXI.Sprite))
			{
				if (typeof console !== "undefined" && console.warn)
				{
					console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects.");
				}
				return;
			}
		}
		this.mask = mask;
		return this;
	};

	/**
	 * Setter for the alpha
	 * @method setAlpha
	 * @param {Number} alpha The alpha amount to use, from 0 to 1
	 * @return {DisplayObject} Instance for chaining
	 */
	/**
	 * Shortcut for setAlpha.
	 * @method a
	 * @param {Number} alpha The alpha amount to use, from 0 to 1
	 * @return {DisplayObject} Instance for chaining
	 */
	p.setAlpha = p.a = function(alpha)
	{
		this.alpha = alpha;
		return this;
	};

	/**
	 * Set the tint values by color.
	 * @method setTint
	 * @param {int} tint The color value to tint
	 * @return {DisplayObject} Object for chaining
	 */
	/**
	 * Shortcut to setTint.
	 * @method tn
	 * @param {Number} tint The red percentage value
	 * @return {DisplayObject} Object for chaining
	 */
	p.setTint = p.i = function(tint)
	{
		// this.tint = tint
		// return this;
		// TODO: Replace with DisplayObject.tint setter
		// once the functionality is added to Pixi.js, for
		// now we'll use the slower ColorMatrixFilter to handle
		// the color transformation
		var r = tint >> 16 & 0xFF;
		var g = tint >> 8 & 0xFF;
		var b = tint & 0xFF;
		return this.c(r / 255, 0, g / 255, 0, b / 255, 0);
	};

	/**
	 * Set additive and multiply color, tinting
	 * @method setColorTransform
	 * @param {Number} r The multiply red value
	 * @param {Number} rA The additive red value
	 * @param {Number} g The multiply green value
	 * @param {Number} gA The additive green value
	 * @param {Number} b The multiply blue value
	 * @param {Number} bA The additive blue value
	 * @return {DisplayObject} Object for chaining
	 */
	/**
	 * Shortcut to setColor.
	 * @method c
	 * @param {Number} r The multiply red value
	 * @param {Number} rA The additive red value
	 * @param {Number} g The multiply green value
	 * @param {Number} gA The additive green value
	 * @param {Number} b The multiply blue value
	 * @param {Number} bA The additive blue value
	 * @return {DisplayObject} Object for chaining
	 */
	p.setColorTransform = p.c = function(r, rA, g, gA, b, bA)
	{
		var filter = this.colorTransformFilter;
		filter.matrix[0] = r;
		filter.matrix[4] = rA;
		filter.matrix[6] = g;
		filter.matrix[9] = gA;
		filter.matrix[12] = b;
		filter.matrix[14] = bA;
		this.filters = [filter];
		return this;
	};

	/**
	 * The current default color transforming filters
	 * @property {PIXI.filters.ColorMatrixFilter} colorTransformFilter
	 */
	if (!p.hasOwnProperty('colorTransformFilter'))
	{
		Object.defineProperty(p, 'colorTransformFilter',
		{
			set: function(filter)
			{
				this._colorTransformFilter = filter;
			},
			get: function()
			{
				return this._colorTransformFilter || new ColorMatrixFilter();
			}
		});
	}

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {DisplayObject} child The child function
	 * @return {DisplayObject} THe child
	 */
	PIXI.DisplayObject.extend = PIXI.DisplayObject.e = function(child)
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
				params.push(item);
			}
		}
		return this;
	};

	/**
	 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
	 * since the fill or stroke was last set.
	 * @method c
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.c = p.closePath;

	/**
	 * Alias for addHole
	 * @method h
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.h = p.addHole;

	/**
	 * Shortcut to moveTo.
	 * @method m
	 * @param {Number} x The x coordinate the drawing point should move to.
	 * @param {Number} y The y coordinate the drawing point should move to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls).
	 **/
	p.m = p.moveTo;

	/**
	 * Shortcut to lineTo.
	 * @method l
	 * @param {Number} x The x coordinate the drawing point should draw to.
	 * @param {Number} y The y coordinate the drawing point should draw to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.l = p.lineTo;

	/**
	 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
	 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
	 * whatwg spec</a>. A tiny API method "qt" also exists.
	 * @method q
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.q = p.quadraticCurveTo;

	/**
	 * Shortcut to bezierCurveTo.
	 * @method b
	 * @param {Number} cp1x
	 * @param {Number} cp1y
	 * @param {Number} cp2x
	 * @param {Number} cp2y
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.b = p.bezierCurveTo;

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
	p.dr = p.drawRect;

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
	 * @method ac
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 * @param {Number} startAngle Measured in radians.
	 * @param {Number} endAngle Measured in radians.
	 * @param {Boolean} anticlockwise
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.ar = p.arc;

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
	PIXI.Sprite.extend = PIXI.Sprite.e = function(child)
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
	 * Shortcut for `setAlign`.
	 * @method g
	 * @param {String|int} align Either, center (0), right (1), left (-1)
	 * @return {Text} For chaining
	 */
	p.setAlign = p.g = function(align)
	{
		this.style.align = align || "left";
		var x;
		if (typeof align == "string")
		{
			switch (align)
			{
				case "center":
					x = 0.5;
					break;
				case "right":
					x = 1;
					break;
				case "left":
					x = 0;
					break;
			}
		}
		else
		{
			x = (align + 1) / 2;
		}
		this.anchor.x = x;
		return this;
	};

	// Map of short names to long names
	var STYLE_PROPS = {
		o: 'font',
		i: 'fill',
		a: 'align',
		s: 'stroke',
		t: 'strokeThickness',
		w: 'wordWrap',
		d: 'wordWrapWidth',
		l: 'lineHeight',
		h: 'dropShadow',
		c: 'dropShadowColor',
		n: 'dropShadowAngle',
		b: 'dropShadowBlur',
		p: 'padding',
		x: 'textBaseline',
		j: 'lineJoin',
		m: 'miterLimit',
		e: 'letterSpacing'
	};

	/**
	 * Set the style, a chainable version of style setter
	 * @method setStyle
	 * @param {Object} style
	 * @return {PIXI.Text} instance of text field
	 */
	/**
	 * Shortcut for `setStyle`.
	 * @method ss
	 * @param {Object} style
	 * @return {PIXI.Text} instance of text field
	 */
	p.setStyle = p.ss = function(style)
	{
		// Replace short STYLE_PROPS with long names
		for (var k in STYLE_PROPS)
		{
			if (style[k] !== undefined)
			{
				style[STYLE_PROPS[k]] = style[k];
				delete style[k];
			}
		}
		this.style = style;
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