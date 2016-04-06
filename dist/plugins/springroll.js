/*! PixiAnimate 0.3.3 */
/**
 * @module SpringRoll Plugin
 * @namespace PIXI.animate
 * @requires PixiAnimate
 */
(function(undefined)
{
	var Debug;

	/**
	 * Handles the Asset loading for Flash Art takes care of unloading
	 * @class FlashArt
	 * @constructor
	 * @private
	 * @param {String} id The asset id
	 * @param {NodeElement} dom The `<script>` element added to the document
	 * @param {String} [libName='lib'] The window parameter name
	 */
	var FlashArt = function(id, dom, libName)
	{
		if (true && Debug === undefined)
		{
			Debug = include('springroll.Debug', false);
		}

		/**
		 * Reference to the node element
		 * @property {NodeElement} dom
		 */
		this.dom = dom;

		/**
		 * The collection of loaded symbols by name
		 * @property {Array} symbols
		 */
		this.symbols = [];

		/**
		 * The name of the output lib name
		 * @property {String} libName
		 * @default 'lib'
		 */
		this.libName = libName || 'lib';

		/**
		 * The name of the output lib name
		 * @property {String} id
		 */
		this.id = id;

		// Pare the dome object
		this.parseSymbols(dom.text);
	};

	// Reference to the prototype
	var p = FlashArt.prototype;

	/**
	 * The collection of all symbols and assets
	 * @property {Object} globalSymbols
	 * @static
	 * @private
	 */
	FlashArt.globalSymbols = {};

	/**
	 * Get the name of all the library elements of the dom text
	 * @method parseSymbols
	 * @param {String} text The DOM text contents
	 */
	p.parseSymbols = function(text)
	{
		// split into the initialization functions, that take 'lib' as a parameter
		var textArray = text.split(/[\(!]function\s*\(/);

		var globalSymbols = FlashArt.globalSymbols;
		// go through each initialization function
		for (var i = 0; i < textArray.length; ++i)
		{
			text = textArray[i];
			if (!text) continue;

			// determine what the 'lib' parameter has been minified into
			var libName = text.substring(0, text.indexOf(","));
			if (!libName) continue;

			// get all the things that are 'lib.X = <stuff>'
			var varFinder = new RegExp("\\(" + libName + ".(\\w+)\\s*=", "g");
			var foundName = varFinder.exec(text);
			var assetId;

			while (foundName)
			{
				assetId = foundName[1];

				// Warn about collisions with assets that already exist
				if (true && Debug && globalSymbols[assetId])
				{
					Debug.warn(
						"Flash Asset Collision: asset '" + this.id +
						"' wants to create 'lib." + assetId +
						"' which is already created by asset '" +
						FlashArt.globalSymbols[assetId] + "'"
					);
				}

				// keep track of the asset id responsible
				this.symbols.push(assetId);
				globalSymbols[assetId] = this.id;
				foundName = varFinder.exec(text);
			}
		}
	};

	/**
	 * Cleanup the Flash library that's been loaded
	 * @method destroy
	 */
	p.destroy = function()
	{
		// remove the <script> element from the stage
		this.dom.parentNode.removeChild(this.dom);
		this.dom = null;

		// Delete the elements
		var globalSymbols = FlashArt.globalSymbols;
		var lib = window[this.libName];
		this.symbols.forEach(function(id)
		{
			delete globalSymbols[id];
			delete lib[id];
		});
		this.symbols = null;
	};

	// Assign to namespace
	namespace('PIXI.animate').FlashArt = FlashArt;

}());
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
/**
 * @module SpringRoll Plugin
 * @namespace PIXI.animate
 * @requires PixiAnimate
 */
(function(undefined)
{
	var MovieClip = include('PIXI.animate.MovieClip');
	var AnimatorInstance = include('springroll.AnimatorInstance');
	var GenericMovieClipInstance = include('springroll.GenericMovieClipInstance');

	/**
	 * The SpringRoll plugin for working with MovieClips and SpringRoll's Animator
	 * @class MovieClipInstance
	 * @extends springroll.GenericMovieClipInstance
	 * @private
	 */
	var MovieClipInstance = function()
	{
		GenericMovieClipInstance.call(this);
	};

	/**
	 * Required to test clip
	 * @method test
	 * @static
	 * @param {*} clip The object to test
	 * @return {Boolean} If the clip is compatible with this plugin
	 */
	MovieClipInstance.test = function(clip)
	{
		return clip instanceof MovieClip;
	};

	MovieClipInstance.hasAnimation = GenericMovieClipInstance.hasAnimation;
	MovieClipInstance.getDuration = GenericMovieClipInstance.getDuration;

	// Inherit the AnimatorInstance
	var s = GenericMovieClipInstance.prototype;
	var p = AnimatorInstance.extend(MovieClipInstance, GenericMovieClipInstance);

	p._Generic_beginAnim = p.beginAnim;

	p.beginAnim = function(animObj, isRepeat)
	{
		this._Generic_beginAnim(animObj, isRepeat);

		//because PIXI.animate.MovieClip no longer updates the timeline in advance(), we need
		//to make sure the timeline is updated immediately in this case
		this.clip._updateTimeline();
	};

	p._Generic_setPosition = p.setPosition;
	p.setPosition = function(newPos)
	{
		this._Generic_setPosition(newPos);

		//update the timeline manually, because MovieClips that are children of other PixiAnimate
		//display objects won't get their ticks fired when tickEnabled is false.
		this.clip._updateTimeline();
	};

	// Assign to namespace
	namespace('PIXI.animate').MovieClipInstance = MovieClipInstance;

}());
/**
 * @module SpringRoll Plugin
 * @namespace PIXI.animate
 * @requires PixiAnimate
 */
(function()
{
	// Include classes
	var ApplicationPlugin = include('springroll.ApplicationPlugin');

	// Create a new plugin
	var plugin = new ApplicationPlugin();

	plugin.setup = function()
	{
		this.assetManager.register('PIXI.animate.FlashArtTask', 60);
		this.assetManager.register('PIXI.animate.SpriteSheetTask', 70);
		this.animator.register('PIXI.animate.MovieClipInstance', 10);
	};

}());
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