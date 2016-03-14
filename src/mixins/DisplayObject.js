/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class DisplayObject
	 */
	var p = PIXI.DisplayObject.prototype;

	// Color Matrix filter
	var ColorMatrixFilter;
	if (PIXI.filters)
	{
		ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
	}

	/**
	 * Function to see if this is renderable or not. Useful for setting masks.
	 * @method setRenderable
	 * @param  {Boolean} [renderable=false] Make renderable
	 * @return {Graphics}
	 */
	/**
	 * Shortcut to setRenderable.
	 * @method re
	 * @param  {Boolean} [renderable=false] Make renderable
	 * @return {Graphics}
	 */
	p.setRenderable = p.re = function(renderable)
	{
		this.renderable = !!renderable;
		return this;
	};

	/**
	 * Shortcut for setTransform.
	 * @method tr
	 * @param {Number} x The X position
	 * @param {Number} y The Y position
	 * @param {Number} scaleX The X Scale value
	 * @param {Number} scaleY The Y Scale value
	 * @param {Number} skewX The X skew value
	 * @param {Number} skewY The Y skew value
	 * @param {Number} pivotX The X pivot value
	 * @param {Number} pivotY The Y pivot value
	 * @return {DisplayObject} Instance for chaining
	 */
	p.t = p.setTransform;

	/**
	 * Setter for mask to be able to chain.
	 * @method setMask
	 * @param {PIXI.Graphics} mask The mask shape to use
	 * @return {DisplayObject} Instance for chaining
	 */
	/**
	 * Shortcut for setMask.
	 * @method ma
	 * @param {PIXI.Graphics} mask The mask shape to use
	 * @return {DisplayObject} Instance for chaining
	 */
	p.setMask = p.ma = function(mask)
	{
		this.mask = mask;
		return this;
	};

	/**
	 * Setter for the alpha
	 * @method setAlpha
	 * @param {Number} alpha The alpha amount to use, from 0 to 1
	 * @return {DisplayObject} Instance for chaining
	 */
	/**
	 * Shortcut for setAlpha.
	 * @method a
	 * @param {Number} alpha The alpha amount to use, from 0 to 1
	 * @return {DisplayObject} Instance for chaining
	 */
	p.setAlpha = p.a = function(alpha)
	{
		this.alpha = alpha;
		return this;
	};

	/**
	 * Set the tint values by color.
	 * @method setTint
	 * @param {int} tint The color value to tint
	 * @return {DisplayObject} Object for chaining
	 */
	/**
	 * Shortcut to setTint.
	 * @method tn
	 * @param {Number} tint The red percentage value
	 * @return {DisplayObject} Object for chaining
	 */
	// p.setTint = p.i = function(tint)
	// {
	// 	// this.tint = tint
	// 	// return this;
	//        // TODO: Replace with DisplayObject.tint setter
	//        // once the functionality is added to Pixi.js, for
	//        // now we'll use the slower ColorMatrixFilter to handle
	//        // the color transformation
	//        return this.c(tint);
	// };

	/**
	 * Set additive and multiply color, tinting
	 * @method setColorTransform
	 * @param {Array|int} colorTransform The color unit or array matrix of either 2, or 8 values
	 * @return {DisplayObject} Object for chaining
	 */
	/**
	 * Shortcut to setColor.
	 * @method c
	 * @param {Array|int} colorTransform The color unit or array matrix of either 2, or 8 values
	 * @return {DisplayObject} Object for chaining
	 */
	// p.setColorTransform = p.c = function(colorTransform)
	// {
	//     this.colorTransform = colorTransform;
	//     return this;
	// };

	/**
	 * The color matrix of either 2 or 8 values or a single color (multiply only)
	 * @property {Array|int} colorTransform
	 */
	// Object.defineProperty(p, 'colorTransform', 
	// {
	//     set: function(color)
	//     {
	//         console.log("setter colorTransform", color);
	//         var colorTransform = this._colorTransform;
	//         if (!colorTransform)
	//         {
	//             colorTransform = this._colorTransform = new ColorMatrixFilter();
	//             if (Array.isArray(this.filters))
	//             {
	//                 this.filters.push(colorTransform);
	//             }
	//             else
	//             {
	//                 this.filters = [colorTransform];
	//             }
	//         }
	//         if (typeof color == "number")
	//         {
	//             // Convert rgb value to color matrix values
	//             color = convertColorsToMatrix(color);
	//         }
	//         // Convert [rgb, a] to color matrix values
	//         else if (color.length == 2)
	//         {
	//             // to the tint later here
	//             color = convertColorsToMatrix(color[0], color[1]);
	//         }

	//         // map the [r, r0, g, g0, b, b0, a, a0] to the matrix
	//         colorTransform.matrix[0] = color[0]; // r
	//         colorTransform.matrix[4] = color[1]; // r0
	//         colorTransform.matrix[6] = color[2]; // g
	//         colorTransform.matrix[9] = color[3]; // g0
	//         colorTransform.matrix[12] = color[4]; // b
	//         colorTransform.matrix[14] = color[5]; // b0
	//         colorTransform.matrix[18] = color[6]; // a
	//         colorTransform.matrix[19] = color[7]; // a0

	//         console.log(this, this._colorTransform);
	//     },
	//     get: function()
	//     {
	//         return this._colorTransform;
	//     }
	// });

	// Utility to convert a color to 8-length color transform matrix
	// function convertColorsToMatrix(color, alpha)
	// {
	//     var a = alpha !== undefined ? alpha : 1;
	//     var r = color >> 16 & 0xFF;
	//     var g = color >> 8 & 0xFF;
	//     var b = color & 0xFF;

	//     console.log(r, g, b, a);

	//     // Convert rgb values to color matrix values
	//     return [r, 0, g, 0, b, 0, a, 0];
	// }

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {DisplayObject} child The child function
	 * @return {DisplayObject} THe child
	 */
	PIXI.DisplayObject.extend = PIXI.DisplayObject.e = function(child)
	{
		child.prototype = Object.create(p);
		child.prototype.__parent = p;
		child.prototype.constructor = child;
		return child;
	};

}(PIXI));