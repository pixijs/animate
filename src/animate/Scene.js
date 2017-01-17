import load from './load';
import sound from './sound';

/**
 * Extends the PIXI.Application to provide easy loading.
 * ```
 * const scene = new PIXI.animate.Scene();
 * scene.load(lib.StageName);
 * ```
 * @class Scene
 * @memberof PIXI.animate
 * @param {Number} [width=800] Stage width
 * @param {Number} [height=600] Stage height
 * @param {Object} [renderOptions] See PIXI.Application for more info.
 * @param {Boolean} [noWebGL=false] Disable WebGL
 */
class Scene extends PIXI.Application {

	constructor(width, height, renderOptions, noWebGL) {
		super(width, height, renderOptions, noWebGL);

		/**
		 * Reference to the global sound object
		 * @name PIXI.animate.Scene#sound
		 * @type {PIXI.animate.sound}
		 * @readOnly
		 */
		this.sound = sound;

		/**
		 * The stage object created.
		 * @name PIXI.animate.Scene#instance
		 * @type {PIXI.animate.MovieClip}
		 * @readOnly
		 */
		this.instance = null;
	}

	/**
	 * Load a stage scene and add it to the stage.
	 * @method PIXI.animate.Scene#load
	 * @param {Function} StageRef Reference to the stage class.
	 * @param {Function} [complete]
	 * @param {String} [basePath] Base root directory
	 * @return {PIXI.loaders.Loader} instance of PIXI resource loader
	 */
	load(StageRef, complete, basePath) {
		return load(StageRef, this.stage, (instance) => {
			this.instance = instance;
			if (complete) {
				complete(instance);
			}
		}, basePath);
	}

	/**
	 * Destroy and don't use after calling.
	 * @method PIXI.animate.Scene#destroy
	 * @param {Boolean} [removeView=false] `true` to remove canvas element.
	 */
	destroy(removeView) {
		if (this.instance) {
			this.instance.destroy(true);
			this.instance = null;
		}
		super.destroy(removeView);
	}
}

export default Scene;