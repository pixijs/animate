(function()
{
	var LoadTask = include('springroll.LoadTask'),
		SpriteSheet = include('PIXI.animate.SpriteSheet'),
		TextureAtlas = include('springroll.pixi.TextureAtlas'),
		Texture = include('PIXI.Texture');

	/**
	 * Load a spritesheet generated from Flash and adds it to the global ss namespace.
	 * This namespace is shared with regular CreateJS art, as it can't be changed in Flash's
	 * publishing settings. As such, don't name spritesheets for CreateJS and PixiAnimate the same
	 * thing if both spritesheets are being used by art published from Flash.
	 * @class SpriteSheetTask
	 * @extends springroll.LoadTask
	 * @constructor
	 * @private
	 * @param {Object} asset The data properties
	 * @param {String} asset.type Asset type must be "pixi"
	 * @param {String} asset.format Asset format must be "PIXI.animate.SpriteSheet"
	 * @param {String} asset.src The source
	 * @param {Boolean} [asset.cache=false] If we should cache the result
	 * @param {String} [asset.id] Id of asset
	 * @param {Function} [asset.complete] The event to call when done
	 * @param {Object} [asset.sizes=null] Define if certain sizes are not supported
	 */
	var SpriteSheetTask = function(asset)
	{
		LoadTask.call(this, asset, asset.src);
	};

	// Reference to prototype
	var s = LoadTask.prototype;
	var p = extend(SpriteSheetTask, LoadTask);

	/**
	 * Test if we should run this task
	 * @method test
	 * @static
	 * @param {Object} asset The asset to check
	 * @return {Boolean} If the asset is compatible with this asset
	 */
	SpriteSheetTask.test = function(asset)
	{
		return asset.src &&
			asset.src.search(/\.json$/i) > -1 &&
			asset.type == "pixi" &&
			asset.format == "PIXI.animate.SpriteSheet";
	};

	/**
	 * Start the task
	 * @method  start
	 * @param  {Function} callback Callback when finished
	 */
	p.start = function(callback)
	{
		this.load(this.src, function(data)
			{
				var images = [];
				data.images.forEach(function(image)
				{
					// Convert string loads
					if (typeof image == "string")
					{
						image = {
							image: image,
							type: 'pixi'
						};
					}
					// Use pixi tasks to load images
					images.push(image);
				});

				var id = this.id;
				this.load(images, function(textures)
				{
					data.images.forEach(function(image, i)
					{
						// assume the textures are the same order as
						// the files that were loaded, need to double-check
						data.images[i] = textures[i].baseTexture;
					});
					var spriteSheet = new SpriteSheet(data);
					spriteSheet.addToGlobal(id);
					callback(spriteSheet);
				});
			}
			.bind(this));
	};

	// Assign to namespace
	namespace('PIXI.animate').SpriteSheetTask = SpriteSheetTask;

}());