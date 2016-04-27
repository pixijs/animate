import ShapesCache from './ShapesCache';

/**
 * The middleware for PIXI's ResourceLoader to be able to 
 * load Flash symbols such as graphics and images.
 * @namespace PIXI.animate
 * @class SymbolLoader
 */
let SymbolLoader = function() {
    return function(resource, next) {
        let url = resource.url;
        let data = resource.data;

        if (url.search(/\.shapes\.(json|txt)$/i) > -1) {
            if (typeof data === "string") {
                // Decode string to map of files
                data = ShapesCache.decode(data);
            }
            for (let name in data) {
                ShapesCache.add(name, data[name]);
            }
        } else if (data.nodeName && data.nodeName === 'IMG') {
            // Add individual images to the texture cache by their
            // short symbol name, not the URL
            PIXI.Texture.addTextureToCache(
                PIXI.Texture.fromFrame(url),
                resource.name
            );
        }
        next();
    };
};

// Assign to the loader
PIXI.loaders.Loader.addPixiMiddleware(SymbolLoader);

export default SymbolLoader;