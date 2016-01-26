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