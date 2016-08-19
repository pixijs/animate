/**
 * Mixins for the PIXI.Container class.
 * @class Container
 * @memberof PIXI
 */
const p = PIXI.Container.prototype;

/**
 * Shortcut for `addChild`.
 * @method PIXI.Container#ac
 * @param {*} [child*] N-number of children
 * @return {PIXI.DisplayObject} Instance of first child added
 */
p.ac = p.addChild;

/**
 * Extend a container
 * @method PIXI.Container.extend
 * @static
 * @param {PIXI.Container} child The child function
 * @return {PIXI.Container} THe child
 */
/**
 * Extend a container (shortcut for `extend`)
 * @method PIXI.Container.e
 * @static
 * @param {PIXI.Container} child The child function
 * @return {PIXI.Container} THe child
 */
PIXI.Container.extend = PIXI.Container.e = function(child) {
    child.prototype = Object.create(p);
    child.prototype.__parent = p;
    child.prototype.constructor = child;
    return child;
};