import utils from './utils';

/**
 * Contains the collection of graphics data
 * @namespace PIXI.animate
 * @class ShapesCache
 */
const ShapesCache = {};

/**
 * Add an item or itesm to the cache
 * @method add
 * @static
 * @param {String} prop  The id of graphic or the map of graphics to add
 * @param {String|Array<Array>} items Collection of draw commands
 */
Object.defineProperty(ShapesCache, 'add', {
    enumerable: false,
    value: function(prop, items) {

        // Decode string to map of files
        if (typeof items === "string") {
            items = utils.deserializeShapes(items);
        }

        // Convert all hex string colors (animate) to int (pixi.js)
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            for (let j = 0; j < item.length; j++) {
                let arg = item[j];
                if (typeof arg === 'string' && arg[0] === '#') {
                    item[j] = utils.hexToUint(arg);
                }
            }
        }
        ShapesCache[prop] = items;
    }
});


/**
 * Get the graphic from cache
 * @method  fromCache
 * @static
 * @param  {String} id The cache id
 * @return {Array} Series of graphic draw commands
 */
Object.defineProperty(ShapesCache, 'fromCache', {
    enumerable: false,
    value: function(id) {
        return ShapesCache[id] || null;
    }
});

/**
 * Remove the graphic from cache
 * @method  remove
 * @static
 * @param  {String|Object} id The cache id or map
 */
Object.defineProperty(ShapesCache, 'remove', {
    enumerable: false,
    value: function(id) {
        if (typeof id === "object") {
            for (let name in id) {
                ShapesCache.remove(name);
            }
            return;
        }
        if (ShapesCache[id]) {
            ShapesCache[id].length = 0;
            delete ShapesCache[id];
        }
    }
});

/**
 * Remove all graphics from cache
 * @method  removeAll
 * @static
 */
Object.defineProperty(ShapesCache, 'removeAll', {
    enumerable: false,
    value: function() {
        for (let id in ShapesCache) {
            ShapesCache.remove(id);
        }
    }
});

// Assign to namespace
export default ShapesCache;