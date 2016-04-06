/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	/**
	 * @class ColorUtils
	 * @private
	 * @description For converting colors
	 */
	var ColorUtils = {};

	/**
	 * Convert the Hexidecimal string (e.g., "#fff") to uint
	 * @static
	 * @private
	 * @method hexToUint
	 */
	ColorUtils.hexToUint = function(hex)
	{
		// Remove the hash
		hex = hex.substr(1);

		// Convert shortcolors fc9 to ffcc99
		if (hex.length == 3)
		{
			hex = hex.replace(/([a-f0-9])/g, '$1$1');
		}
		return parseInt(hex, 16);
	};

	// Assign to namespace
	PIXI.animate.ColorUtils = ColorUtils;

}(PIXI));