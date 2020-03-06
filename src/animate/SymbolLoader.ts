import {ShapesCache} from './ShapesCache';
import {LoaderResource, Loader, Texture} from 'pixi.js';

/**
 * The middleware for PIXI's ResourceLoader to be able to
 * load Flash symbols such as graphics and images.
 * @private
 */
export const SymbolLoader = function() {
    return function(resource:LoaderResource, next:()=>void) {
        let url = resource.url;
        let data = resource.data;

        if (!data) {
            next();
        } else if (url.search(/\.shapes\.(json|txt)$/i) > -1) {
            ShapesCache.add(resource.name, data);
        } else if (data.nodeName && data.nodeName === 'IMG') {
            // Add individual images to the texture cache by their
            // short symbol name, not the URL
            Texture.addToCache(
                resource.texture,
                resource.name
            );
        }
        next();
    };
};

// Assign to the loader
Loader.registerPlugin({use:SymbolLoader()});
