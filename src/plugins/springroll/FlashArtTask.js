/**
 * @module SpringRoll Plugin
 * @namespace PIXI.animate
 * @requires PixiAnimate
 */
(function()
{
	var Task = include('springroll.Task'),
		FlashArt = include('PIXI.animate.FlashArt'),
		TextureAtlas = include('springroll.pixi.TextureAtlas'),
		Texture = include('PIXI.Texture');

	/**
	 * Loads a FlashArt, making it easier to load and unload PixiAnimate art.
	 * @class FlashArtTask
	 * @extends springroll.Task
	 * @constructor
	 * @private
	 * @param {Object} asset The data properties
	 * @param {String} asset.type Asset type must be "pixi"
	 * @param {String} asset.format Asset format must be "PIXI.animate.FlashArt"
	 * @param {String} asset.src The source
	 * @param {Array} asset.images An array of Image, TextureAtlas, or SpriteSheet assets to load
	 * @param {Boolean} [asset.cache=false] If we should cache the result
	 * @param {String} [asset.id] Id of asset
	 * @param {Function} [asset.complete] The event to call when done
	 * @param {Object} [asset.sizes=null] Define if certain sizes are not supported
	 */
	var FlashArtTask = function(asset)
	{
		Task.call(this, asset, asset.src);

		/**
		 * The path to the flash asset
		 * @property {String} src
		 */
		this.src = this.filter(asset.src);

		/**
		 * Any image, atlas, or SpriteSheet assets that should be loaded along with this piece
		 * of flash art.
		 * @property {Array} images
		 */
		this.images = asset.images;

		/**
		 * The name of the window object library items hang on
		 * @property {String} libName
		 */
		this.libName = "lib";

		/**
		 * The name of the window object images hang on
		 * @property {String} imagesName
		 */
		this.imagesName = "images";
	};

	// Reference to prototype
	var p = extend(FlashArtTask, Task);

	/**
	 * Test if we should run this task
	 * @method test
	 * @static
	 * @param {Object} asset The asset to check
	 * @return {Boolean} If the asset is compatible with this asset
	 */
	FlashArtTask.test = function(asset)
	{
		return asset.src &&
			asset.src.search(/\.js$/i) > -1 &&
			asset.type == "pixi" &&
			asset.format == "PIXI.animate.FlashArt" &&
			asset.images && Array.isArray(asset.images);
	};

	/**
	 * Start the task
	 * @method  start
	 * @param  {Function} callback Callback when finished
	 */
	p.start = function(callback)
	{
		var images = [];
		var atlas, assetCount = 0;
		var asset;
		for (var i = 0; i < this.images.length; ++i)
		{
			//check for texture atlases from TexturePacker or similar things
			if (this.images[i].atlas)
			{
				asset = this.images[i];
				atlas = {
					atlas: this.filter(asset.atlas),
					id: "asset_" + (assetCount++),
					type: "pixi"
				};
				if (asset.image)
					atlas.image = this.filter(asset.image);
				else
				{
					atlas.alpha = this.filter(asset.alpha);
					atlas.color = this.filter(asset.color);
				}
				images.push(atlas);
			}
			//Check for EaselJS style SpriteSheets
			else if (this.images[i].format == "PIXI.animate.SpriteSheet")
			{
				asset = this.images[i].clone();
				images.push(asset);
				if (!asset.type)
					asset.type = "pixi";
				if (!asset.id)
					asset.id = "asset_" + (assetCount++);
			}
			//standard images
			else
			{
				//check for urls
				if (typeof this.images[i] == "string")
					asset = {
						image: this.filter(this.images[i])
					};
				//and full tasks
				else
					asset = this.images[i].clone();
				//ensure an ID for these
				if (!asset.id)
				{
					var fallbackId = asset.src || asset.color;
					// Remove the file extension
					var extIndex = fallbackId.lastIndexOf('.');
					if (extIndex > -1)
					{
						fallbackId = fallbackId.substr(0, extIndex);
					}
					// Check for the last folder slash then remove it
					var slashIndex = fallbackId.lastIndexOf('/');
					if (slashIndex > -1)
					{
						fallbackId = fallbackId.substr(slashIndex + 1);
					}
					asset.id = fallbackId;
				}
				//also ensure that they are PIXI Texture assets
				asset.type = "pixi";
				images.push(asset);
			}
		}

		var assets = {
			_flash: this.src
		};
		if (images.length)
			assets._images = {
				assets: images
			};

		// Load all the assets
		this.load(assets, function(results)
		{
			var art = new FlashArt(
				this.id,
				results._flash,
				this.libName
			);

			var images = results._images;
			if (images)
			{
				var image;
				var objectsToDestroy = [];
				var texturesToRemove = [];
				var globalImages = namespace(this.imagesName);

				for (var id in images)
				{
					var result = images[id];

					//save the item for cleanup
					objectsToDestroy.push(result);

					//look for individual images
					if (result instanceof Texture)
					{
						globalImages[id] = result;
						texturesToRemove.push(id);
					}
					else if (result instanceof TextureAtlas)
					{
						var frames = result.frames;
						for (var frame in frames)
						{
							globalImages[frame] = frames[frame];
							texturesToRemove.push(frame);
						}
					}
				}

				art._orig_destroy = art.destroy;
				art.destroy = function()
				{
					var i;
					for (i = objectsToDestroy.length - 1; i >= 0; --i)
					{
						if (objectsToDestroy[i].destroy)
							objectsToDestroy[i].destroy();
						else
							objectsToDestroy[i].dispatchEvent("destroy");
					}
					for (i = texturesToRemove.length - 1; i >= 0; --i)
					{
						delete globalImages[texturesToRemove[i]];
					}
					art._orig_destroy();
				};
			}
			callback(art);

		}.bind(this));
	};

	// Assign to namespace
	namespace('PIXI.animate').FlashArtTask = FlashArtTask;

}());