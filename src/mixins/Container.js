/**
 * @module PixiAnimate
 * @namespace PIXI
 */
(function(PIXI, undefined)
{
	/**
	 * @class Container
	 */
	var p = PIXI.Container.prototype;

	/**
	 * Shortcut for addChild.
	 * @method ac
	 * @param {*} [child*] N-number of children
	 * @return {Container} Instance of this container
	 */
	p.ac = p.addChild;

	/**
	 * Extend a container
	 * @method extend
	 * @static
	 * @param {Container} child The child function
	 * @return {Container} THe child
	 */
	PIXI.Container.extend = PIXI.Container.e = function(child)
	{
		child.prototype = Object.create(p);
		child.prototype.__parent = p;
		child.prototype.constructor = child;
		return child;
	};

}(PIXI));