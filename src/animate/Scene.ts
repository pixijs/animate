import { load } from './load';
import { sound } from './sound';
import type { MovieClip } from './MovieClip';
import { Application } from 'pixi.js';
import type { EventEmitter, DestroyOptions } from 'pixi.js';
import type { AnimateAsset } from '../AnimateAsset';

/**
 * Extends the PIXI.Application class to provide easy loading.
 * Note (v8): Application requires async initialization before use:
 * ```
 * const scene = new PIXI.animate.Scene();
 * await scene.init({ width: 800, height: 600 });
 * scene.load(lib.StageName);
 * ```
 */
export class Scene extends Application
{
    /**
     * Reference to the global sound object
     * @readOnly
     */
    public readonly sound: EventEmitter = sound;

    /**
     * The stage object created.
     */
    public instance: MovieClip = null;

    /**
     * Load a stage scene and add it to the stage.
     * @param asset - Reference to the scene to load.
     * @param complete - Callback when finished loading.
     * @param basePath - Optional base directory to prepend to assets.
     * @return instance of PIXI resource loader
     */
    public load(asset: AnimateAsset, complete?: (instance?: MovieClip) => void, basePath?: string): void
    {
        return load(asset, {
            parent: this.stage,
            createInstance: true,
            complete: (instance) =>
            {
                this.instance = instance as MovieClip;
                if (complete)
                {
                    complete(this.instance);
                }
            },
            basePath,
        });
    }

    /**
     * Destroy and don't use after calling.
     * @param removeView - Automatically remove canvas from DOM.
     * @param stageOptions - Options parameter. A boolean will act as if all options
     *  have been set to that value
     */
    destroy(removeView?: boolean, stageOptions?: DestroyOptions | boolean): void
    {
        if (this.instance)
        {
            this.instance.destroy(true);
            this.instance = null;
        }
        // v8 destroy signature: (rendererDestroyOptions, options)
        super.destroy({ removeView: !!removeView }, stageOptions as DestroyOptions);
    }
}
