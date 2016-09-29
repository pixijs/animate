// Configure PIXI Loader to handle audio files correctly
const Resource = PIXI.loaders.Resource;
Resource.setExtensionLoadType('wav', Resource.LOAD_TYPE.AUDIO);
Resource.setExtensionLoadType('mp3', Resource.LOAD_TYPE.AUDIO);
Resource.setExtensionLoadType('ogg', Resource.LOAD_TYPE.AUDIO);

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
 * @return {PIXI.loaders.Loader} instance of PIXI resource loader
 */
const load = function(options, parent, complete, basePath) {

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

    const Resource = PIXI.loaders.Resource;
    Resource.setExtensionLoadType('wav', Resource.LOAD_TYPE.AUDIO);
    Resource.setExtensionLoadType('mp3', Resource.LOAD_TYPE.AUDIO);
    Resource.setExtensionLoadType('ogg', Resource.LOAD_TYPE.AUDIO);

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
            loader.add(id, basePath + assets[id]);
        }
        loader.once('complete', done).load();
    } else {
        // tiny case where there's only text and no shapes/animations
        done();
    }

    return loader;
};

export default load;