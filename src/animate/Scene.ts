import {load, StageRef} from './load';
import {sound} from './sound';
import {MovieClip} from './MovieClip';
import {Application, StageOptions, utils} from 'pixi.js';

/**
 * Extends the PIXI.Application class to provide easy loading.
 * ```
 * const scene = new PIXI.animate.Scene();
 * scene.load(lib.StageName);
 * ```
 */
export class Scene extends Application {
    /**
     * Reference to the global sound object
     * @readOnly
     */
    public readonly sound:utils.EventEmitter = sound;
    
    /**
     * The stage object created.
     */
    public instance:MovieClip = null;

    /**
     * Load a stage scene and add it to the stage.
     * @param StageRef Reference to the stage class.
     * @param complete Callback when finished loading.
     * @param basePath Optional base directory to prepend to assets.
     * @return instance of PIXI resource loader
     */
    public load(StageRef:StageRef, complete?:(instance?:MovieClip)=>void, basePath?:string) {
        return load(StageRef, this.stage, (instance) => {
            this.instance = instance as MovieClip;
            if (complete) {
                complete(this.instance);
            }
        }, basePath);
    }

    /**
     * Destroy and don't use after calling.
     * @param removeView Automatically remove canvas from DOM.
     * @param stageOptions Options parameter. A boolean will act as if all options
     *  have been set to that value
     */
    destroy(removeView?: boolean, stageOptions?: StageOptions | boolean): void {
        if (this.instance) {
            this.instance.destroy(true);
            this.instance = null;
        }
        super.destroy(removeView, stageOptions);
    }
}