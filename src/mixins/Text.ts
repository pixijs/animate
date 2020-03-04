import { Text, filters, Graphics, Sprite, TextStyleOptions } from 'pixi.js';
import {utils_ns as utils} from '../animate/utils';
// Color Matrix filter
let ColorMatrixFilter: typeof filters.ColorMatrixFilter;
if (filters) {
    ColorMatrixFilter = filters.ColorMatrixFilter;
}

// Possible align values
enum ALIGN_VALUES {
    center = 0,
    right = 1,
    left = -1
};

// Map of short names to long names
const STYLE_PROPS = {
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
 * Check if a value is undefined, fallback to default value
 * @param value The value to check
 * @param defaultValue The default value if value is undefined
 * @return Either the value or the default value
 */
function isUndefinedOr<T>(value:T, defaultValue:T) {
    return value === undefined ? defaultValue : value;
};

export class AnimateText extends Text {
    // **************************
    //     Text methods
    // **************************

    /**
     * Setter for the alignment, also sets the anchor point
     * to make sure the positioning is correct.
     * @param align Either center (0), right (1), left (-1)
     * @return This instance for chaining
     */
    public setAlign(align:'center'|'right'|'left'|0|1|-1) {
        if (typeof align == "string") {
            align = ALIGN_VALUES[align];
        }
        this.style.align = ALIGN_VALUES[align] || "left";
        this.anchor.x = (align + 1) / 2;
        return this;
    }
    /**
     * Shortcut for `setAlign`.
     */
    public g = this.setAlign;

    /**
     * Set the style, a chainable version of style setter
     * @param style
     * @return This instance for chaining.
     */
    /**
     * Shortcut for `setStyle`.
     * @method PIXI.Text#ss
     * @param {Object} style
     * @return {PIXI.Text} instance of text field
     */
    public setStyle(style:TextStyleOptions) {
        // Replace short STYLE_PROPS with long names
        for (const k in STYLE_PROPS) {
            if ((style as any)[k] !== undefined) {
                (style as any)[(STYLE_PROPS as any)[k]] = (style as any)[k];
                delete (style as any)[k];
            }
        }
        this.style = style as any;
        return this;
    }
    public ss = this.setStyle;

    /**
     * Initial setting of the drop shadow.
     * @param color The color to set
     * @param angle The angle of offset, in radians
     * @param distance The offset distance
     * @return This instance for chaining
     */
    public setShadow(color:string|number, angle:number, distance:number) {
        const style = this.style;
        style.dropShadow = true;

        // Convert color to hex string
        if (color && typeof color === 'number') {
            color = "#" + color.toString(16);
        }
        style.dropShadowColor = isUndefinedOr(color, style.dropShadowColor);
        style.dropShadowAngle = isUndefinedOr(angle, style.dropShadowAngle);
        style.dropShadowDistance = isUndefinedOr(distance, style.dropShadowDistance);
        return this;
    }
    /**
     * Shortcut for `setShadow`.
     */
    public sh = this.setShadow;

    // **************************
    //     DisplayObject methods
    // **************************

    /**
     * Function to set if this is renderable or not. Useful for setting masks.
     * @param  renderable Make renderable. Defaults to false.
     * @return This instance, for chaining.
     */
    public setRenderable(renderable?:boolean) {
        this.renderable = !!renderable;
        return this;
    }
    /**
     * Shortcut for `setRenderable`.
     */
    public re = this.setRenderable;

    /**
     * Shortcut for `setTransform`.
     */
    public t = super.setTransform;

    /**
     * Setter for mask to be able to chain.
     * @param mask The mask shape to use
     * @return Instance for chaining
     */
    public setMask(mask:Graphics|Sprite) {
        // According to PIXI, only Graphics and Sprites can
        // be used as mask, let's ignore everything else, like other
        // movieclips and displayobjects/containers
        if (mask) {
            if (!(mask instanceof Graphics) && !(mask instanceof Sprite)) {
                if (typeof console !== "undefined" && console.warn) {
                    console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects.");
                }
                return this;
            }
        }
        this.mask = mask;
        return this;
    }
    /**
     * Shortcut for `setMask`.
     */
    public ma = this.setMask;

    /**
     * Chainable setter for alpha
     * @param alpha The alpha amount to use, from 0 to 1
     * @return Instance for chaining
     */
    public setAlpha(alpha:number) {
        this.alpha = alpha;
        return this;
    }
    /**
     * Shortcut for `setAlpha`.
     */
    public a = this.setAlpha;

    /**
     * Set the tint values by color.
     * @param tint The color value to tint
     * @return Object for chaining
     */
    public setTint(tint:string|number) {
        if (typeof tint === "string") {
            tint = utils.hexToUint(tint);
        }
        // this.tint = tint
        // return this;
        // TODO: Replace with DisplayObject.tint setter
        // once the functionality is added to Pixi.js, for
        // now we'll use the slower ColorMatrixFilter to handle
        // the color transformation
        const r = tint >> 16 & 0xFF;
        const g = tint >> 8 & 0xFF;
        const b = tint & 0xFF;
        return this.setColorTransform(r / 255, 0, g / 255, 0, b / 255, 0);
    }
    /**
     * Shortcut for `setTint`.
     */
    public i = this.setTint;

    /**
     * Set additive and multiply color, tinting
     * @param r The multiply red value
     * @param rA The additive red value
     * @param g The multiply green value
     * @param gA The additive green value
     * @param b The multiply blue value
     * @param bA The additive blue value
     * @return Object for chaining
     */
    public setColorTransform(r:number, rA:number, g:number, gA:number, b:number, bA:number) {
        const filter = this.colorTransformFilter;
        filter.matrix[0] = r;
        filter.matrix[4] = rA;
        filter.matrix[6] = g;
        filter.matrix[9] = gA;
        filter.matrix[12] = b;
        filter.matrix[14] = bA;
        this.filters = [filter];
        return this;
    }
    /**
     * Shortcut for `setColor`.
     */
    public c = this.setColorTransform;

    protected _colorTransformFilter:filters.ColorMatrixFilter;
    /**
     * The current default color transforming filters
     */
    public set colorTransformFilter(filter:filters.ColorMatrixFilter) {
        this._colorTransformFilter = filter;
    }
    public get colorTransformFilter() {
        return this._colorTransformFilter || new ColorMatrixFilter();
    }
}