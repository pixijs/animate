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