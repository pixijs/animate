/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Graphics
	 */
	var p = PIXI.Graphics.prototype;

	/**
	 * Shortcut for drawCommands.
	 * @method d
	 * @param  {Array} commands The commands and parameters to draw
	 * @return {Graphics}
	 */
	/**
	 * Execute a series of commands, this is the name of the short function
	 * followed by the parameters, e.g., `["f", "#ff0000", "r", 0, 0, 100, 200]`
	 * @method drawCommands
	 * @param  {Array} commands The commands and parameters to draw
	 * @return {Graphics}
	 */
	p.drawCommands = p.d = function(commands)
	{
		var currentCommand, params = [],
			i = 0;

		while (i <= commands.length)
		{
			var item = commands[i++];
			if (item === undefined || this[item])
			{
				if (currentCommand)
				{
					this[currentCommand].apply(this, params);
					params.length = 0;
				}
				currentCommand = item;
			}
			else
			{
				params.push(item);
			}
		}
		return this;
	};

	/**
	 * Closes the current path, effectively drawing a line from the current drawing point to the first drawing point specified
	 * since the fill or stroke was last set.
	 * @method c
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.c = p.closePath;

	/**
	 * Alias for addHole
	 * @method h
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.h = p.addHole;

	/**
	 * Shortcut to moveTo.
	 * @method m
	 * @param {Number} x The x coordinate the drawing point should move to.
	 * @param {Number} y The y coordinate the drawing point should move to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls).
	 **/
	p.m = p.moveTo;

	/**
	 * Shortcut to lineTo.
	 * @method l
	 * @param {Number} x The x coordinate the drawing point should draw to.
	 * @param {Number} y The y coordinate the drawing point should draw to.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.l = p.lineTo;

	/**
	 * Draws a quadratic curve from the current drawing point to (x, y) using the control point (cpx, cpy). For detailed
	 * information, read the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-quadraticcurveto">
	 * whatwg spec</a>. A tiny API method "qt" also exists.
	 * @method q
	 * @param {Number} cpx
	 * @param {Number} cpy
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.q = p.quadraticCurveTo;

	/**
	 * Shortcut to bezierCurveTo.
	 * @method b
	 * @param {Number} cp1x
	 * @param {Number} cp1y
	 * @param {Number} cp2x
	 * @param {Number} cp2y
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.b = p.bezierCurveTo;

	/**
	 * Shortcut to beginFill.
	 * @method f
	 * @param {Uint} color The hex color value (e.g. 0xFFFFFF)
	 * null will result in no fill.
	 * @param {Number} [alpha=1] The alpha value of fill
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.f = p.beginFill;

	/**
	 * Shortcut to lineStyle.
	 * @method s
	 * @param {String} color A CSS compatible color value (ex. "#FF0000", "red", or "rgba(255,0,0,0.5)"). Setting to
	 * null will result in no stroke.
	 * @param {Number} [thickness=1] The thickness of the stroke
	 * @param {Number} [alpha=1] The alpha value from 0 (invisibile) to 1 (visible)
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.s = p.lineStyle;

	/**
	 * Shortcut to drawRect.
	 * @method dr
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	/**
	 * Shortcut to drawRect.
	 * @method r
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.dr = p.drawRect;

	/**
	 * Shortcut to drawRoundedRect.
	 * @method rr
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @param {Number} radius The corner radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rr = p.drawRoundedRect;

	/**
	 * Shortcut to drawRoundedRect.
	 * @method rc
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} w Width of the rectangle
	 * @param {Number} h Height of the rectangle
	 * @param {Number} radiusTL The top left corner radius
	 * @param {Number} radiusTR The top right corner radius
	 * @param {Number} radiusBR The bottom right corner radius
	 * @param {Number} radiusBL The bottom left corner radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rc = p.drawRoundedRect;

	/**
	 * Shortcut to drawCircle.
	 * @method dc
	 * @param {Number} x x coordinate center point of circle.
	 * @param {Number} y y coordinate center point of circle.
	 * @param {Number} radius Radius of circle.
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.dc = p.drawCircle;

	/**
	 * Shortcut to arc.
	 * @method a
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} radius
	 * @param {Number} startAngle Measured in radians.
	 * @param {Number} endAngle Measured in radians.
	 * @param {Boolean} anticlockwise
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.a = p.arc;

	/**
	 * Shortcut to arcTo.
	 * @method at
	 * @param {Number} x1
	 * @param {Number} y1
	 * @param {Number} x2
	 * @param {Number} y2
	 * @param {Number} radius
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.at = p.arcTo;

	/**
	 * Shortcut to drawEllipse.
	 * @method  de
	 * @param  {Number} x      [description]
	 * @param  {Number} y      [description]
	 * @param  {Number} width  [description]
	 * @param  {Number} height [description]
	 */
	p.de = p.drawEllipse;

	/**
	 * Placeholder method for a linear fill. Pixi does not support linear fills,
	 * so we just pick the first color in colorArray
	 * @method lf
	 * @param {Array} colorArray An array of CSS compatible color values @see `f`
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.lf = function(colorArray)
	{
		if (DEBUG)
		{
			console.warn("Linear gradient fills are not supported");
		}
		return this.f(colorArray[0]);
	};

	/**
	 * Placeholder method for a radial fill. Pixi does not support radial fills,
	 * so we just pick the first color in colorArray
	 * @method rf
	 * @param {Array} colorArray An array of CSS compatible color values @see `f`
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rf = function(colorArray)
	{
		if (DEBUG)
		{
			console.warn("Radial gradient fills are not supported");
		}
		return this.f(colorArray[0]);
	};

	/**
	 * Placeholder method for a beginBitmapFill. Pixi does not support bitmap fills.
	 * @method bf
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.bf = function()
	{
		if (DEBUG)
		{
			console.warn("Bitmap fills are not supported");
		}
		return this.f(0x0);
	};

	/**
	 * Placeholder method for a setStrokeDash. Pixi does not support dashed strokes.
	 * @method sd
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.sd = function()
	{
		if (DEBUG)
		{
			console.warn("Dashed strokes are not supported");
		}
		return this;
	};

	/**
	 * Placeholder method for a beginBitmapStroke. Pixi does not support bitmap strokes.
	 * @method bs
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.bs = function()
	{
		if (DEBUG)
		{
			console.warn("Bitmap strokes are not supported");
		}
		return this;
	};

	/**
	 * Placeholder method for a beginLinearGradientStroke. Pixi does not support gradient strokes.
	 * @method ls
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.ls = function()
	{
		if (DEBUG)
		{
			console.warn("Linear gradient strokes are not supported");
		}
		return this;
	};

	/**
	 * Placeholder method for a beginRadialGradientStroke. Pixi does not support gradient strokes.
	 * @method rs
	 * @return {Graphics} The Graphics instance the method is called on (useful for chaining calls.)
	 **/
	p.rs = function()
	{
		if (DEBUG)
		{
			console.warn("Radial gradient strokes are not supported");
		}
		return this;
	};

}(PIXI));