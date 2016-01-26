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
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Container
	 */
	var p = PIXI.Container.prototype;

	/**
	 * Add multiple children instead of one at a time.
	 * @method addChildren
	 * @param {*} [child*] N-number of children
	 * @return {Container} Instance of this container
	 */
	/**
	 * Shortcut for addChildren.
	 * @method ac
	 * @param {*} [child*] N-number of children
	 * @return {Container} Instance of this container
	 */
	p.addChildren = p.ac = function(child)
	{
		for (var i = 0; i < arguments.length; i++)
		{
			this.addChild(arguments[i]);
		}
		return this;
	};

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
	p.cp = function()
	{
		var currentPath = this.currentPath;
		if (currentPath && currentPath.shape)
		{
			currentPath.shape.closed = true;
		}
		return this;
	};

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