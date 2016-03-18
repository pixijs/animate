/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function()
{
	// Check for window, fallback to global
	var global = typeof window !== 'undefined' ? window : GLOBAL;

	// Define PIXI Flash namespace
	var animate = {};

	// Export for Node-compatible environments like Electron
	if (typeof module !== 'undefined' && module.exports)
	{
		// Attempt to require the pixi module
		if (typeof PIXI === 'undefined')
		{
			// Include the Pixi.js module
			require('pixi.js');
		}

		// Export the module
		module.exports = animate;
	}
	// If we're in the browser make sure PIXI is available 
	else if (typeof PIXI === 'undefined')
	{
		if (DEBUG)
		{
			throw "PixiAnimate requires PIXI to be loaded before PixiAnimate is loaded!";
		}
		else
		{
			throw "Requires PIXI";
		}
	}

	// Assign to global namespace
	global.PIXI.animate = animate;

}());