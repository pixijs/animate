import ShapesCache from './ShapesCache';

/**
 * The middleware for PIXI's ResourceLoader to be able to 
 * load Flash symbols such as graphics and images.
 * @memberof PIXI.animate
 * @class SymbolLoader
 * @private
 */
let SymbolLoader = {
    use: function(resource, next) {
        let url = resource.url;
        let data = resource.data;

        if (!data) {
            next();
        } else if (url.search(/\.shapes\.(json|txt)$/i) > -1) {
            ShapesCache.add(resource.name, data);
        } else if (data.nodeName && data.nodeName === 'IMG') {
            // Add individual images to the texture cache by their
            // short symbol name, not the URL
            PIXI.Texture.addTexture(
                resource.texture,
                resource.name
            );
        }
        next();
    }
};

// Assign to the loader
PIXI.Loader.registerPlugin(SymbolLoader);

export default SymbolLoader;
