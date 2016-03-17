/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI, undefined)
{
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageClass Reference to the stage class
	 * @param {Array} [StageClass.assets] Assets used to preload
	 * @param {PIXI.Container|Function} parentOrComplete Either the container to add the stage to
	 *        or the callback function when complete.
	 * @param {Function} [complete] Function to call when complete
	 */
	var load = function(StageClass, parent, complete)
	{
		if (typeof parent == "function")
		{
			complete = parent;
			parent = null;
		}

		var assets = StageClass.assets || [];
		var loader = new PIXI.loaders.Loader();

		function done()
		{
			var stage = new StageClass();
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
			for (var asset, i = 0; i < assets.length; i++)
			{
				asset = assets[i];
				if (Array.isArray(asset))
				{
					loader.add.apply(loader, asset);
				}
				else
				{
					loader.add(asset);
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