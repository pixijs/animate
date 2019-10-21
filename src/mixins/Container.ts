import { Container as PContainer, filters, Graphics, Sprite } from 'pixi.js';
import {utils} from '../animate/utils';
type CMF = filters.ColorMatrixFilter;
// Color Matrix filter
let ColorMatrixFilter: typeof filters.ColorMatrixFilter;
if (filters) {
    ColorMatrixFilter = filters.ColorMatrixFilter;
}

/**
 * Utility subclass of PIXI.Container
 */
export class Container extends PContainer {
    // **************************
    //     Container methods
    // **************************

    /**
     * Shortcut for `addChild`.
     */
    public ac = super.addChild;

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

    protected _colorTransformFilter:CMF;
    /**
     * The current default color transforming filters
     */
    public set colorTransformFilter(filter:CMF) {
        this._colorTransformFilter = filter;
    }
    public get colorTransformFilter() {
        return this._colorTransformFilter || new ColorMatrixFilter();
    }
}