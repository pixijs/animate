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