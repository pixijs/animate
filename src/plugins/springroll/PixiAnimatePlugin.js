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