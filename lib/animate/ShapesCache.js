'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Contains the collection of graphics data
 * @memberof PIXI.animate
 * @class ShapesCache
 */
var ShapesCache = {};

/**
 * Add an item or itesm to the cache
 * @method PIXI.animate.ShapesCache.add
 * @static
 * @param {String} prop  The id of graphic or the map of graphics to add
 * @param {String|Array<Array>} items Collection of draw commands
 */
Object.defineProperty(ShapesCache, 'add', {
    enumerable: false,
    value: function value(prop, items) {

        // Decode string to map of files
        if (typeof items === "string") {
            items = _utils2.default.deserializeShapes(items);
        }

        // Convert all hex string colors (animate) to int (pixi.js)
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            for (var j = 0; j < item.length; j++) {
                var arg = item[j];
                if (typeof arg === 'string' && arg[0] === '#') {
                    item[j] = _utils2.default.hexToUint(arg);
                }
            }
        }
        ShapesCache[prop] = items;
    }
});

/**
 * Get the graphic from cache
 * @method  PIXI.animate.ShapesCache.fromCache
 * @static
 * @param  {String} id The cache id
 * @return {Array} Series of graphic draw commands
 */
Object.defineProperty(ShapesCache, 'fromCache', {
    enumerable: false,
    value: function value(id) {
        return ShapesCache[id] || null;
    }
});

/**
 * Remove the graphic from cache
 * @method  PIXI.animate.ShapesCache.remove
 * @static
 * @param  {String|Object} id The cache id or map
 */
Object.defineProperty(ShapesCache, 'remove', {
    enumerable: false,
    value: function value(id) {
        if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) === "object") {
            for (var name in id) {
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
 * @method  PIXI.animate.ShapesCache.removeAll
 * @static
 */
Object.defineProperty(ShapesCache, 'removeAll', {
    enumerable: false,
    value: function value() {
        for (var id in ShapesCache) {
            ShapesCache.remove(id);
        }
    }
});

// Assign to namespace
exports.default = ShapesCache;
//# sourceMappingURL=ShapesCache.js.map