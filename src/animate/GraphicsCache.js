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
	 * @param {String} prop  The id of graphic
	 * @param {Array} [value] If adding a single property, the draw commands
	 */
	Object.defineProperty(GraphicsCache, "add",
	{
		enumerable: false,
		value: function(prop, value)
		{
			GraphicsCache[prop] = value;
		}
	});

	/**
	 * Decode a shapes string into draw commands
	 * @method decode
	 * @static
	 * @param  {String} str The string to decode
	 */
	Object.defineProperty(GraphicsCache, "decode",
	{
		enumerable: false,
		value: function(str)
		{
			// each shape is a new line
			var shapes = str.split("\n");
			var isCommand = /^[a-z]{1,2}$/;
			var isColor = /^#/;
			for (var i = 0; i < shapes.length; i++)
			{
				var shape = shapes[i].split(" "); // arguments are space separated
				var name = shape.shift(); // first argument is the ID
				for (var j = 0; j < shape.length; j++)
				{
					// Convert colors and numbers into proper types
					var arg = shape[j];
					if (isColor.test(arg))
						shape[j] = parseInt(arg.substr(1), 16);
					else if (!isCommand.test(arg))
						shape[j] = parseFloat(arg);
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