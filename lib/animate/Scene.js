'use strict';

exports.__esModule = true;

var _load2 = require('./load');

var _load3 = _interopRequireDefault(_load2);

var _sound = require('./sound');

var _sound2 = _interopRequireDefault(_sound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends the PIXI.Application class to provide easy loading.
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
var Scene = function (_PIXI$Application) {
	_inherits(Scene, _PIXI$Application);

	function Scene(width, height, renderOptions, noWebGL) {
		_classCallCheck(this, Scene);

		/**
   * Reference to the global sound object
   * @name PIXI.animate.Scene#sound
   * @type {PIXI.animate.sound}
   * @readOnly
   */
		var _this = _possibleConstructorReturn(this, _PIXI$Application.call(this, width, height, renderOptions, noWebGL));

		_this.sound = _sound2.default;

		/**
   * The stage object created.
   * @name PIXI.animate.Scene#instance
   * @type {PIXI.animate.MovieClip}
   * @readOnly
   */
		_this.instance = null;
		return _this;
	}

	/**
  * Load a stage scene and add it to the stage.
  * @method PIXI.animate.Scene#load
  * @param {Function} StageRef Reference to the stage class.
  * @param {Function} [complete] Callback when finished loading.
  * @param {String} [basePath] Optional base directory to prepend to assets.
  * @return {PIXI.loaders.Loader} instance of PIXI resource loader
  */


	Scene.prototype.load = function load(StageRef, complete, basePath) {
		var _this2 = this;

		return (0, _load3.default)(StageRef, this.stage, function (instance) {
			_this2.instance = instance;
			if (complete) {
				complete(instance);
			}
		}, basePath);
	};

	/**
  * Destroy and don't use after calling.
  * @method PIXI.animate.Scene#destroy
  * @param {Boolean} [removeView=false] `true` to remove canvas element.
  */


	Scene.prototype.destroy = function destroy(removeView) {
		if (this.instance) {
			this.instance.destroy(true);
			this.instance = null;
		}
		_PIXI$Application.prototype.destroy.call(this, removeView);
	};

	return Scene;
}(PIXI.Application);

exports.default = Scene;
//# sourceMappingURL=Scene.js.map