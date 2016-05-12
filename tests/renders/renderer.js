'use strict';

const md5 = require('js-md5');
const path = require('path');
const ImageDiff = require('./imagediff');

/**
 * Class to create solutions
 * @class Renderer
 * @constructor
 */
const Renderer = function(viewWebGL, viewContext2d) {
    this.stage = new PIXI.Container();
    this.hasWebGL = PIXI.utils.isWebGLSupported();
    if (this.hasWebGL) {
        this.webgl = new PIXI.WebGLRenderer(32, 32, {
            view: viewWebGL,
            backgroundColor: 0xffffff,
            antialias: false,
            preserveDrawingBuffer: true
        });
    }
    this.canvas = new PIXI.CanvasRenderer(32, 32, {
        view: viewContext2d,
        backgroundColor: 0xffffff,
        antialias: false,
        preserveDrawingBuffer: true,
        roundPixels: true
    });
    this.canvas.smoothProperty = null;
    this.render();

    this.instance = null;
    this.imagediff = new ImageDiff(32, 32, 0.01);
};

// Reference to the prototype
const p = Renderer.prototype;

/**
 * Rerender the stage
 * @method render
 */
p.render = function() {
    if (this.hasWebGL) {
        this.webgl.render(this.stage);
    }
    this.canvas.render(this.stage);
};

/**
 * Clear the stage
 * @method clear
 */
p.clear = function() {
    this.stage.removeChildren();
    if (this.instance) {
        this.instance.destroy(true);
        this.instance = null;
    }
    this.render();
};

/**
 * Run the solution renderer
 * @method run
 * @param {String} file Fully resolved path
 * @param {Function} callback Takes error and result as arguments
 */
p.run = function(file, callback) {
    delete require.cache[path.resolve(file)];
    let fla = require(file);
    if (!Object.keys(fla).length || !fla.stage) {
        return callback(new Error('Invalid PixiAnimate format, make sure to enable "CommonJS Compatible Output" option in the Adobe Animate publishing settings.'));
    }
    PIXI.animate.load(fla.stage, (instance) => {
        this.clear();
        this.instance = instance;
        this.stage.addChild(instance);
        const result = {
            webgl: [],
            webglRenders: [],
            canvas: [],
            canvasRenders: []
        };

        for(let i = 0; i < fla.totalFrames; i++) {
            let data;
            instance.gotoAndStop(i);
            this.render();
            if (this.hasWebGL) {
                data = this.webgl.view.toDataURL();
                result.webgl.push(md5(data));
                result.webglRenders.push(data);
            }
            data = this.canvas.view.toDataURL();
            result.canvas.push(md5(data));
            result.canvasRenders.push(data);
        }
        callback(null, result);
    }, path.dirname(file));
};

/**
 * Compare a file with a solution.
 * @method compare
 * @param {String} file The file to load.
 * @param {Object} solution
 * @param {Array<String>} solution.webgl
 * @param {Array<String>} solution.canvas
 * @param {Function} callback Complete callback, takes err as an error and success boolean as args.
 */
p.compare = function(file, solution, callback) {
    this.run(file, (err, result) => {
        if (err) {
            return callback(err);
        }
        if (this.hasWebGL) {
            if (!this.compareHash(solution.webgl, result.webgl)) {
                if (!this.compareImages(solution.webglRenders, result.webglRenders)) {
                    return callback(new Error('WebGL results do not match.'));
                }
            }
        }
        if (!this.compareHash(solution.canvas, result.canvas)) {
            if (!this.compareImages(solution.canvasRenders, result.canvasRenders)) {
                return callback(new Error('Canvas results do not match.'));
            }
        }
        callback(null, true);
    });
};

/**
 * Compare two arrays of images
 * @method compareImages
 * @private
 * @param {Array} a
 * @param {Array} b
 * @return {Boolean} If we're equal
 */
p.compareImages = function(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }

    let length = a.length;
    if (b.length !== length) {
        return false;
    }
    
    for (let i=0; i<length; i++) {
        if (!this.imagediff.compare(a[i], b[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Compare two arrays
 * @method compareHash
 * @private
 * @param {Array} a
 * @param {Array} b
 * @return {Boolean} If we're equal
 */
p.compareHash = function(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }

    let length = a.length;
    if (b.length !== length) {
        return false;
    }

    for (let i=0; i<length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

module.exports = Renderer;