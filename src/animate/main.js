/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(window)
{
	if (!window.PIXI)
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
	window.PIXI.animate = {};

}(window));