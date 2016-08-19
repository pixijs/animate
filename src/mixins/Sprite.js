/**
 * Mixins for the PIXI.Sprite class.
 * @memberof PIXI
 * @class Sprite
 */
const p = PIXI.Sprite.prototype;

/**
 * Extend a container
 * @method PIXI.Sprite.extend
 * @static
 * @param {PIXI.Sprite} child The child function
 * @return {PIXI.Sprite} THe child
 */
/**
 * Extend a container (shortcut for `extend`)
 * @method PIXI.Sprite.e
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