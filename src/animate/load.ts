import type { Container } from '@pixi/display';
import type { AnimateAsset } from '../AnimateAsset';
import type { MovieClip } from './MovieClip';
import type { DrawCommands } from './Graphics';
import { utils } from './utils';
import { Assets } from '@pixi/assets';
import { Texture } from '@pixi/core';
import { Spritesheet } from '@pixi/spritesheet';

type Complete = (instance: MovieClip | null) => void;
export interface LoadOptions
{
    /**
     * The Container to auto-add the stage to, if createInstance is true.
     */
    parent?: Container;
    /**
     * Callback for load completion.
     */
    complete?: Complete;
    /**
     * Base root directory
     */
    basePath?: string;
    /**
     * Enable or disable automatic instantiation of stage - defaults to false.
     */
    createInstance?: boolean;
    /**
     * Metadata to be handed off to the loader for assets that are loaded.
     */
    metadata?: any;
}

const EXPECTED_ASSET_VERSION = 2;

/**
 * Load the stage class and preload any assets
 * ```
 * import MyAsset from './myAsset.js';
 * let renderer = new PIXI.autoDetectRenderer(1280, 720);
 * let stage = new PIXI.Container();
 * PIXI.animate.load(MyAsset, function(asset){
 *     stage.addChild(new asset.stage());
 * });
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @param scene - Reference to the scene data.
 * @param complete - The callback function when complete.
 * @return instance of PIXI resource loader
 */
export function load(scene: AnimateAsset, complete?: Complete): void;
/**
 * Load the stage class and preload any assets
 * ```
 * import MyAsset from './myAsset.js';
 * let basePath = 'file:/path/to/assets';
 * let renderer = new PIXI.Renderer(1280, 720);
 *
 * let extensions = PIXI.compressedTextures.detectExtensions(renderer);
 * let loader = new PIXI.Loader();
 * // this is an example of setting up a pre loader plugin to handle compressed textures in this case
 * loader.pre(PIXI.compressedTextures.extensionChooser(extensions));
 *
 * // specify metadata this way if you want to provide a default loading strategy for all assets listed in the PIXI animation
 * let metadata = { default: { metadata: { imageMetadata: { choice: ['.crn'] } } } };
 * // specify metadata this way if you want to provide a specific loading strategy for a
 * // certain asset listed inside the PIXI animation library
 * let metadata = { MyStage_atlas_1: { metadata: { imageMetadata: { choice: ['.crn'] } } } };
 *
 * let stage = new PIXI.Container();
 * PIXI.animate.load(MyAsset, {
 *     parent: stage,
 *     complete: ()=>{},
 *     basePath: basePath,
 *     loader: loader,
 *     metadata: metadata
 * });
 * function update() {
 *      renderer.render(stage);
 *      update();
 * }
 * update();
 * ```
 * @param scene - Reference to the scene data.
 * @param options - Options for loading.
 * @return instance of PIXI resource loader
 */
export function load(scene: AnimateAsset, options: LoadOptions): void;
export function load(scene: AnimateAsset, optionsOrComplete?: Complete | LoadOptions): void
{
    const complete: Complete = typeof optionsOrComplete === 'function' ? optionsOrComplete : optionsOrComplete?.complete;
    let basePath = '';
    let parent: Container = null;
    let metadata: any;
    let createInstance = false;

    // check scene and warn about it
    const { version } = scene;

    if (typeof version === 'number')
    {
        /* eslint-disable max-len */
        if (Math.floor(version) !== Math.floor(EXPECTED_ASSET_VERSION))
        {
            console.warn(`Asset version is not the major version expected of ${Math.floor(EXPECTED_ASSET_VERSION)} - it may not load properly`, scene);
        }
        else if (version > EXPECTED_ASSET_VERSION)
        {
            console.warn('Asset has been published with a newer version than PixiAnimate expects. It may not load properly.', scene);
        }
        /* eslint-enable max-len */
    }

    if (optionsOrComplete && typeof optionsOrComplete !== 'function')
    {
        basePath = optionsOrComplete.basePath || '';
        parent = optionsOrComplete.parent;
        metadata = optionsOrComplete.metadata;
        createInstance = !!optionsOrComplete.createInstance;
    }

    function done(): void
    {
        const instance = (createInstance && typeof scene.stage === 'function') ? new scene.stage() : null;

        if (parent && instance)
        {
            parent.addChild(instance);
        }
        if (complete)
        {
            complete(instance);
        }
    }

    // Check for assets to preload
    const assets = scene.assets || {};

    if (assets && Object.keys(assets).length)
    {
        const promises: Promise<any>[] = [];
        // assetBaseDir can accept either with trailing slash or not

        if (basePath)
        {
            basePath += '/';
        }
        for (const id in assets)
        {
            let data = null;

            if (metadata)
            {
                // if the metadata was supplied for this particular asset, use these options
                if (metadata[id])
                {
                    data = metadata[id];
                }
                // if the metadata supplied a default option
                else if (metadata.default)
                {
                    data = metadata.default;
                }
            }
            promises.push(Assets.load({ alias: [id], src: basePath + assets[id], data }).then((loadedAsset) =>
            {
                if (!loadedAsset)
                {
                    return; // not sure if this can evet happen
                }
                if (loadedAsset instanceof Spritesheet)
                {
                    scene.spritesheets.push(loadedAsset);
                }
                else if (loadedAsset instanceof Texture)
                {
                    scene.textures[id] = loadedAsset;
                }
                else if (Array.isArray(loadedAsset) || typeof loadedAsset === 'string')
                {
                    // save shape data
                    let items: string | DrawCommands[] = loadedAsset;

                    // Decode string to map of files
                    if (typeof items === 'string')
                    {
                        items = utils.deserializeShapes(items);
                    }

                    // Convert all hex string colors (animate) to int (pixi.js)
                    for (let i = 0; i < items.length; i++)
                    {
                        const item = items[i];

                        for (let j = 0; j < item.length; j++)
                        {
                            const arg = item[j];

                            if (typeof arg === 'string' && arg[0] === '#')
                            {
                                item[j] = utils.hexToUint(arg);
                            }
                        }
                    }
                    scene.shapes[id] = items;
                }
            }));
        }
        Promise.all(promises).then(done);
    }
    else
    {
        // tiny case where there's only text and no shapes/animations
        done();
    }
}
