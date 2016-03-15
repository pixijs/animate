/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Text
	 */
	var p = PIXI.Text.prototype;

	/**
	 * Setter for the alignment, also sets the anchor point
	 * to make sure the positioning is correct.
	 * @method setAlign
	 * @param {String} align Either, center, right, left
	 * @return {Text} For chaining
	 */
	/**
	 * Shortcut for setAlign.
	 * @method al
	 * @param {String} align Either, center, right, left
	 * @return {Text} For chaining
	 */
	// p.setAlign = p.al = function(align)
	// {
	// 	this.style.align = align || "left";
	// 	var x = 0;
	// 	switch (align)
	// 	{
	// 		case "center":
	// 			x = 0.5;
	// 			break;
	// 		case "right":
	// 			x = 1;
	// 			break;
	// 	}
	// 	this.anchor.x = x;
	// 	return this;
	// };

	/**
	 * Initial setting of the drop shadow.
	 * @method setShadow
	 * @param {String} [color="#000000"] The color to set
	 * @param {Number} [angle=Math.PI/4] The angle of offset, in radians
	 * @param {Number} [distance=5] The offset distance
	 * @return {Text} For chaining
	 */
	/**
	 * Shortcut for setShadow.
	 * @method sh
	 * @param {String} [color="#000000"] The color to set
	 * @param {Number} [angle=Math.PI/4] The angle of offset, in radians
	 * @param {Number} [distance=5] The offset distance
	 * @return {Text} For chaining
	 */
	p.setShadow = p.sh = function(color, angle, distance)
	{
		var style = this.style;
		style.dropShadow = true;

		// Convert color to hex string
		if (color !== undefined)
		{
			color = "#" + color.toString(16);
		}
		style.dropShadowColor = isUndefinedOr(color, style.dropShadowColor);
		style.dropShadowAngle = isUndefinedOr(angle, style.dropShadowAngle);
		style.dropShadowDistance = isUndefinedOr(distance, style.dropShadowDistance);
		return this;
	};

	/**
	 * Check if a value is undefined, fallback to default value
	 * @method isUndefinedOr 
	 * @private
	 * @param {*} value The value to check
	 * @param {*} defaultValue The default value if value is undefined
	 * @return {*} The either the value or the default value
	 */
	var isUndefinedOr = function(value, defaultValue)
	{
		return value === undefined ? defaultValue : value;
	};

}(PIXI));