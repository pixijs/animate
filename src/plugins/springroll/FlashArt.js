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
		if (DEBUG && Debug === undefined)
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
				if (DEBUG && Debug && globalSymbols[assetId])
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