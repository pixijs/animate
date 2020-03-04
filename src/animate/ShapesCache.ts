import {utils} from './utils';
import {DrawCommands} from '../mixins';

interface ShapeMap {
    [name:string]:DrawCommands[];
}
interface ShapeCache {
    /**
     * Add an item or items to the cache
     * @param prop The id of graphic to add
     * @param items Collection of draw commands
     */
    add(prop:string, items:string|DrawCommands[]):void;
    /**
     * Get a graphic from cache
     * @param id The cache id
     * @return Series of graphic draw commands
     */
    fromCache(prop:string):DrawCommands[];
    /**
     * Remove a graphic from cache
     * @param id The cache id or map (id keys) to remove
     */
    remove(prop:string|{[id:string]:any}):void;
    /**
     * Remove all graphics from cache
     */
    removeAll():void;
}
/**
 * Contains the collection of graphics data
 * @memberof PIXI.animate
 * @class ShapesCache
 */
export const ShapesCache:ShapeMap & ShapeCache = {} as any;

Object.defineProperty(ShapesCache, 'add', {
    enumerable: false,
    value: function(prop:string, items:string|DrawCommands[]) {
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

Object.defineProperty(ShapesCache, 'fromCache', {
    enumerable: false,
    value: function(id:string) {
        return ShapesCache[id] || null;
    }
});

Object.defineProperty(ShapesCache, 'remove', {
    enumerable: false,
    value: function(id:string|{[id:string]:any}) {
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

Object.defineProperty(ShapesCache, 'removeAll', {
    enumerable: false,
    value: function() {
        for (let id in ShapesCache) {
            ShapesCache.remove(id);
        }
    }
});