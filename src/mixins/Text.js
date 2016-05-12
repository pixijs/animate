/**
 * @namespace PIXI
 * @class Text
 */
const p = PIXI.Text.prototype;

/**
 * Setter for the alignment, also sets the anchor point
 * to make sure the positioning is correct.
 * @method setAlign
 * @param {String} align Either, center, right, left
 * @return {PIXI.Text} For chaining
 */
/**
 * Shortcut for `setAlign`.
 * @method g
 * @param {String|int} align Either, center (0), right (1), left (-1)
 * @return {PIXI.Text} For chaining
 */
p.setAlign = p.g = function(align) {
    this.style.align = align || "left";
    var x;
    if (typeof align == "string") {
        switch (align) {
            case "center":
                x = 0.5;
                break;
            case "right":
                x = 1;
                break;
            case "left":
                x = 0;
                break;
        }
    } else {
        x = (align + 1) / 2;
    }
    this.anchor.x = x;
    return this;
};

// Map of short names to long names
var STYLE_PROPS = {
    o: 'font', // TODO: deprecate in Pixi v4
    z: 'fontSize',
    f: 'fontFamily',
    y: 'fontStyle',
    g: 'fontWeight',
    i: 'fill',
    a: 'align',
    s: 'stroke',
    t: 'strokeThickness',
    w: 'wordWrap',
    d: 'wordWrapWidth',
    l: 'lineHeight',
    h: 'dropShadow',
    c: 'dropShadowColor',
    n: 'dropShadowAngle',
    b: 'dropShadowBlur',
    p: 'padding',
    x: 'textBaseline',
    j: 'lineJoin',
    m: 'miterLimit',
    e: 'letterSpacing'
};

/**
 * Set the style, a chainable version of style setter
 * @method setStyle
 * @param {Object} style
 * @return {PIXI.Text} instance of text field
 */
/**
 * Shortcut for `setStyle`.
 * @method ss
 * @param {Object} style
 * @return {PIXI.Text} instance of text field
 */
p.setStyle = p.ss = function(style) {
    // Replace short STYLE_PROPS with long names
    for (var k in STYLE_PROPS) {
        if (style[k] !== undefined) {
            style[STYLE_PROPS[k]] = style[k];
            delete style[k];
        }
    }
    this.style = style;
    return this;
};

/**
 * Initial setting of the drop shadow.
 * @method setShadow
 * @param {String} [color="#000000"] The color to set
 * @param {Number} [angle=Math.PI/4] The angle of offset, in radians
 * @param {Number} [distance=5] The offset distance
 * @return {PIXI.Text} For chaining
 */
/**
 * Shortcut for setShadow.
 * @method sh
 * @param {String} [color="#000000"] The color to set
 * @param {Number} [angle=Math.PI/4] The angle of offset, in radians
 * @param {Number} [distance=5] The offset distance
 * @return {PIXI.Text} For chaining
 */
p.setShadow = p.sh = function(color, angle, distance) {
    var style = this.style;
    style.dropShadow = true;

    // Convert color to hex string
    if (color !== undefined) {
        color = "#" + color.toString(16);
    }
    style.dropShadowColor = isUndefinedOr(color, style.dropShadowColor);
    style.dropShadowAngle = isUndefinedOr(angle, style.dropShadowAngle);
    style.dropShadowDistance = isUndefinedOr(distance, style.dropShadowDistance);
    return this;
};

/**
 * Check if a value is undefined, fallback to default value
 * @method isUndefinedOr 
 * @private
 * @param {*} value The value to check
 * @param {*} defaultValue The default value if value is undefined
 * @return {*} The either the value or the default value
 */
var isUndefinedOr = function(value, defaultValue) {
    return value === undefined ? defaultValue : value;
};