'use strict';

/**
 * Compare images
 * @class ImageDiff
 */
const ImageDiff = function(width, height, tolerance) {
    this.width = width;
    this.height = height;
    this.tolerance = tolerance;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    this.context = canvas.getContext('2d', {
        antialias: false,
        preserveDrawingBuffer: true
    });
};

const p = ImageDiff.prototype;

/**
 * Compare two base64 images
 * @method compare
 * @param {string} src1
 * @param {string} src2
 * @return {Boolean}
 */
p.compare = function(src1, src2) {
    const a = this.getImageData(src1);
    const b = this.getImageData(src2);
    let len = a.length;
    let diff = a.filter((val, i) => {
        return Math.abs(val - b[i]) / 255 > this.tolerance;
    }); 
    if (diff.length / len > this.tolerance) {
        return false;
    }
    return true;
};

/**
 * Get an array of pixels
 * @method getImageData
 * @param {string} src
 * @return {Uint8ClampedArray}
 */
p.getImageData = function(src) {
    const image = new Image();
    image.src = src;
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(image, 0, 0, this.width, this.height);
    const imageData = this.context.getImageData(0, 0, this.width, this.height);
    return imageData.data;
};

module.exports = ImageDiff;