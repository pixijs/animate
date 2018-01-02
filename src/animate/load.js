/**
 * Load the stage class and preload any assets
 * @method PIXI.animate.load
 * @param {Object} options Options for loading.
 * @param {Function} options.stage Reference to the stage class
 * @param {Object} [options.stage.assets] Assets used to preload
 * @param {PIXI.Container} options.parent The Container to auto-add the stage to.
 * @param {String} [options.basePath] Base root directory
 * @return {PIXI.loaders.Loader} instance of PIXI resource loader
 */
/**
 * Load the stage class and preload any assets
 * ```
 * let renderer = new PIXI.autoDetectRenderer(1280, 720);
 * let stage = new PIXI.Container();
 * PIXI.animate.load(lib.MyStage, function(instance){
 *     stage.addChild(instance);
 * });
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @method PIXI.animate.load
 * @param {Function} StageRef Reference to the stage class.
 * @param {Object} [StageRef.assets] Assets used to preload.
 * @param {Function} complete The callback function when complete.
 * @return {PIXI.loaders.Loader} instance of PIXI resource loader
 */
/**
 * Load the stage class and preload any assets
 * ```
 * let renderer = new PIXI.autoDetectRenderer(1280, 720);
 * let stage = new PIXI.Container();
 * PIXI.animate.load(lib.MyStage, stage);
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @method PIXI.animate.load
 * @param {Function} StageRef Reference to the stage class.
 * @param {Object} [StageRef.assets] Assets used to preload.
 * @param {PIXI.Container} parent The Container to auto-add the stage to.
 * @param {String} [basePath] Base root directory
 * @return {PIXI.loaders.Loader} instance of PIXI resource loader
 */
/**
 * Load the stage class and preload any assets
 * ```
 * let basePath = "file:/path/to/assets";
 * let renderer = new PIXI.autoDetectRenderer(1280, 720);
 * 
 * let extensions = PIXI.compressedTextures.detectExtensions(renderer);
 * let loader = new PIXI.loaders.Loader();
 * // this is an example of setting up a pre loader plugin to handle compressed textures in this case
 * loader.pre(PIXI.compressedTextures.extensionChooser(extensions));
 * 
 * // specify metadata this way if you want to provide a default loading strategy for all assets listed in the PIXI animation
 * let metadata = { default: { metadata: { imageMetadata: { choice: [".crn"] } } } };
 * // specify metadata this way if you want to provide a specific loading strategy for a certain asset listed inside the PIXI animation library
 * let metadata = { MyStage_atlas_1: { metadata: { imageMetadata: { choice: [".crn"] } } } };
 * 
 * let stage = new PIXI.Container();
 * PIXI.animate.load(lib.MyStage, stage, ()=>{}, basePath, loader, metadata);
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @method PIXI.animate.load
 * @param {Function} StageRef Reference to the stage class.
 * @param {Object} [StageRef.assets] Assets used to preload.
 * @param {PIXI.Container} parent The Container to auto-add the stage to.
 * @param {Function} [complete] The callback function when complete.
 * @param {String} [basePath] Base root directory
 * @param {PIXI.loaders.Loader} [loader] A Pixi loader object
 * @param {Object} [metadata] A metadata object for the asset being loaded
 * @return {PIXI.loaders.Loader} instance of PIXI resource loader
 */

const load = function(options, parent, complete, basePath, loader, metadata) {

    // Support arguments (ref, complete, basePath)
    if (typeof parent === "function") {
        basePath = complete;
        complete = parent;
        parent = null;
    } else {
        if (typeof complete === "string") {
            basePath = complete;
            complete = null;
        }
    }

    if (typeof options === "function") {
        options = {
            stage: options,
            parent: parent,
            basePath: basePath || "",
            complete: complete
        };
    }

    options = Object.assign({
        stage: null,
        parent: null,
        basePath: '',
        complete: null
    }, options || {});

    const loader = new PIXI.loaders.Loader();

    function done() {
        let instance = new options.stage();
        if (options.parent) {
            options.parent.addChild(instance);
        }
        if (options.complete) {
            options.complete(instance, loader);
        }
    }

    // Check for assets to preload
    let assets = options.stage.assets || {};
    if (assets && Object.keys(assets).length) {
        // assetBaseDir can accept either with trailing slash or not
        let basePath = options.basePath;
        if (basePath) {
            basePath += "/";
        }
        for (let id in assets) {
            var data = null;
            if(metadata) {
                // if the metadata was supplied for this particular asset, use these options
                if(metadata[id]) {
                    data = metadata[id];
                }
                // if the metadata supplied a default option
                else if (metadata.default){
                    data = metadata.default;
                }
            }
            loader.add(id, basePath + assets[id], data);
        }
        loader.once('complete', done).load();
    } else {
        // tiny case where there's only text and no shapes/animations
        done();
    }

    return loader;
};

export default load;
