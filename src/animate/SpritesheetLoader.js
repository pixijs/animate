/**
 * The middleware for PIXI's ResourceLoader to be able to 
 * load Animate-generated spritesheets. Format is simplier
 * than the build in spritesheet format (a la TexturePacker).
 * @memberof PIXI.animate
 * @class SpritesheetLoader
 * @private
 */
const SpritesheetLoader = function() {
    return function(resource, next) {
        if (!resource.data || !resource.isJson || !resource.data.textures) {
            next();
            return;
        }
        const resourcePath = resource.url
            .replace(this.baseUrl, '')
            .replace(/\.json$/, '.png');

        this.add(resourcePath, function(res) {
            const baseTexture = res.texture.baseTexture;
            const resolution = resource.data.meta.scale || 1;

            // Set the resolution based on the spritesheet data
            baseTexture.resolution = resolution;

            // Must update the texture
            baseTexture.update();

            const queue = [];

            for (const id in resource.data.textures) {
                const frame = resource.data.textures[id];
                const size = new PIXI.Rectangle(
                    frame.x / resolution,
                    frame.y / resolution,
                    frame.w / resolution,
                    frame.h / resolution
                );
                queue.push({
                    id: id,
                    size: size
                });
            }

            // Throttle the texture creation across frames
            // so that it performs a littler nicer
            function processQueue() {
                if (queue.length) {
                    const items = queue.splice(0,
                        SpritesheetLoader.BATCH_SIZE
                    );
                    setTimeout(processItems(items), 0);
                } else {
                    next();
                }
            }

            // Process a sub selection of items from the queue
            function processItems(items) {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    PIXI.utils.TextureCache[item.id] = new PIXI.Texture(
                        baseTexture,
                        item.size
                    );
                }
                processQueue();
            }

            // Start creating the texture
            processQueue();
        });
    };
};

/**
 * The maximum number of Texture to create per frame.
 * @name PIXI.animate.SpritesheetLoader.BATCH_SIZE
 * @type {int}
 * @default 500
 */
SpritesheetLoader.BATCH_SIZE = 500;

// Assign to the loader
PIXI.loaders.Loader.addPixiMiddleware(SpritesheetLoader);

export default SpritesheetLoader;