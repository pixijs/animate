/**
 * @namespace PIXI
 * @class Sprite
 */
var p = PIXI.Sprite.prototype;

/**
 * Extend a container
 * @method extend
 * @static
 * @param {PIXI.Sprite} child The child function
 * @return {PIXI.Sprite} THe child
 */
/**
 * Extend a container (shortcut for extend)
 * @method e
 * @static
 * @param {PIXI.Sprite} child The child function
 * @return {PIXI.Sprite} THe child
 */
PIXI.Sprite.extend = PIXI.Sprite.e = function(child) {
    child.prototype = Object.create(p);
    child.prototype.__parent = p;
    child.prototype.constructor = child;
    return child;
};