/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function()
{
	// Check for window, fallback to global
	var global = typeof window !== 'undefined' ? window : GLOBAL;

	if (typeof PIXI === 'undefined')
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

	// Define PIXI Flash namespace
	global.PIXI.animate = {};

	// Export for Node-compatible
	if (typeof module !== 'undefined' && module.exports)
	{
		module.exports = global.PIXI.animate;
	}

}());