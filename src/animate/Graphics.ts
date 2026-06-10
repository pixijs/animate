import { ColorMatrixFilter, Graphics, FillInput, StrokeInput, Sprite } from 'pixi.js';
import { utils } from './utils';

export type DrawCommands = (string | number)[];

export class AnimateGraphics extends Graphics
{
    private _pendingFill: FillInput = null;
    private _pendingStroke: StrokeInput = null;
    private _pathDirty = false;

    // **************************
    //     Graphics methods
    // **************************

    /**
     * Execute a series of commands, this is the name of the short function
     * followed by the parameters -, e.g., `["f", "#ff0000", "r", 0, 0, 100, 200]`
     * @param commands - The commands and parameters - to draw
     * @return This instance for chaining.
     */
    public drawCommands(commands: DrawCommands): this
    {
        let currentCommand: string; const params = [];
        let i = 0;

        while (i <= commands.length)
        {
            const item = commands[i++];

            if (item === undefined || (this as any)[item])
            {
                if (currentCommand)
                {
                    (this as any)[currentCommand].apply(this, params);
                    params.length = 0;
                }
                currentCommand = item as string;
            }
            else
            {
                params.push(item);
            }
        }
        // v8: fills/strokes are explicit instructions, flush whatever is pending
        this._flushDraw();

        return this;
    }
    /**
     * Shortcut for `drawCommands`.
     */
    public d = this.drawCommands;

    /**
     * v8 port: apply pending fill/stroke styles to the path built so far.
     * In v7 beginFill/lineStyle applied implicitly to subsequent path commands;
     * in v8 we buffer the style and emit fill()/stroke() instructions here.
     */
    private _flushDraw(): void
    {
        if (this._pathDirty)
        {
            if (this._pendingFill !== null)
            {
                super.fill(this._pendingFill);
            }
            if (this._pendingStroke !== null)
            {
                super.stroke(this._pendingStroke);
            }
            if (this._pendingFill === null && this._pendingStroke === null)
            {
                super.beginPath();
            }
        }
        this._pendingFill = null;
        this._pendingStroke = null;
        this._pathDirty = false;
    }

    /**
     * Shortcut for `closePath`.
     **/
    public cp(): this
    {
        return super.closePath();
    }

    /**
     * Shortcut for `beginHole`. v8 port: flush the outer shape now; the
     * following path commands build the hole, attached via cut() in eh().
     **/
    public bh(): this
    {
        const fill = this._pendingFill;
        const stroke = this._pendingStroke;

        this._flushDraw();
        // keep styles around in case more shapes follow after the hole
        this._pendingFill = fill;
        this._pendingStroke = stroke;

        return this;
    }

    /**
     * Shortcut for `endHole`. v8 port: cut() attaches the active path as a
     * hole on the last emitted fill/stroke instruction.
     **/
    public eh(): this
    {
        this.context.cut();
        this._pathDirty = false;

        return this;
    }

    /**
     * Shortcut for `moveTo`.
     **/
    public m(x: number, y: number): this
    {
        this._pathDirty = true;

        return super.moveTo(x, y);
    }

    /**
     * Shortcut for `lineTo`.
     **/
    public l(x: number, y: number): this
    {
        this._pathDirty = true;

        return super.lineTo(x, y);
    }

    /**
     * Shortcut for `quadraticCurveTo`.
     **/
    public q(cpX: number, cpY: number, toX: number, toY: number): this
    {
        this._pathDirty = true;

        return super.quadraticCurveTo(cpX, cpY, toX, toY);
    }

    /**
     * Shortcut for `bezierCurveTo`.
     **/
    public b(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): this
    {
        this._pathDirty = true;

        return super.bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY);
    }

    /**
     * Shortcut for `beginFill`.
     **/
    public f(color?: string | number, alpha?: number): this
    {
        this._flushDraw();
        this._pendingFill = { color: color as any, alpha: alpha === undefined ? 1 : alpha };

        return this;
    }

    /**
     * Shortcut for `lineStyle`.
     **/
    public s(width?: number, color?: string | number, alpha?: number): this
    {
        if (this._pathDirty)
        {
            this._flushDraw();
        }
        this._pendingStroke = { width, color: color as any, alpha: alpha === undefined ? 1 : alpha };

        return this;
    }

    /**
     * Shortcut for `drawRect`.
     **/
    public dr(x: number, y: number, w: number, h: number): this
    {
        this._pathDirty = true;

        return super.rect(x, y, w, h);
    }

    /**
     * Shortcut for `drawRoundedRect`.
     **/
    public rr(x: number, y: number, w: number, h: number, radius: number): this
    {
        this._pathDirty = true;

        return super.roundRect(x, y, w, h, radius);
    }

    /**
     * Shortcut for `drawRoundedRect`.
     **/
    public rc = this.rr;

    /**
     * Shortcut for `drawCircle`.
     **/
    public dc(x: number, y: number, radius: number): this
    {
        this._pathDirty = true;

        return super.circle(x, y, radius);
    }

    /**
     * Shortcut for `arc`.
     **/
    public ar(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this
    {
        this._pathDirty = true;

        return super.arc(cx, cy, radius, startAngle, endAngle, anticlockwise);
    }

    /**
     * Shortcut for `arcTo`.
     **/
    public at(x1: number, y1: number, x2: number, y2: number, radius: number): this
    {
        this._pathDirty = true;

        return super.arcTo(x1, y1, x2, y2, radius);
    }

    /**
     * Shortcut for `drawEllipse`.
     */
    public de(x: number, y: number, w: number, h: number): this
    {
        this._pathDirty = true;

        return super.ellipse(x, y, w, h);
    }

    /**
     * Placeholder method for a linear gradient fill. Pixi does not support linear gradient fills,
     * so we just pick the first color in colorArray
     * @param colorArray - An array of CSS compatible color values @see `f`
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public lf(colorArray: number[]): this
    {
        // @if DEBUG
        console.warn('Linear gradient fills are not supported');
        // @endif

        return this.f(colorArray[0]) as this;
    }

    /**
     * Placeholder method for a radial gradient fill. Pixi does not support radial gradient fills,
     * so we just pick the first color in colorArray
     * @param colorArray - An array of CSS compatible color values @see `f`
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public rf(colorArray: number[]): this
    {
        // @if DEBUG
        console.warn('Radial gradient fills are not supported');
        // @endif

        return this.f(colorArray[0]) as this;
    }

    /**
     * Placeholder method for a `beginBitmapFill`. Pixi does not support bitmap fills.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public bf(): this
    {
        // @if DEBUG
        console.warn('Bitmap fills are not supported');
        // @endif

        return this.f(0x0) as this;
    }

    /**
     * Placeholder method for a `setStrokeDash`. Pixi does not support dashed strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public sd(): this
    {
        // @if DEBUG
        console.warn('Dashed strokes are not supported');
        // @endif

        return this;
    }

    /**
     * Placeholder method for a `beginBitmapStroke`. Pixi does not support bitmap strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public bs(): this
    {
        // @if DEBUG
        console.warn('Bitmap strokes are not supported');
        // @endif

        return this;
    }

    /**
     * Placeholder method for a `beginLinearGradientStroke`. Pixi does not support gradient strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public ls(): this
    {
        // @if DEBUG
        console.warn('Linear gradient strokes are not supported');
        // @endif

        return this;
    }

    /**
     * Placeholder method for a `beginRadialGradientStroke`. Pixi does not support gradient strokes.
     * @return The Graphics instance the method is called on (useful for chaining calls.)
     **/
    public rs(): this
    {
        // @if DEBUG
        console.warn('Radial gradient strokes are not supported');
        // @endif

        return this;
    }

    // **************************
    //     DisplayObject methods
    // **************************

    /**
     * Function to set if this is renderable or not. Useful for setting masks.
     * @param renderable - Make renderable. Defaults to false.
     * @return This instance, for chaining.
     */
    public setRenderable(renderable?: boolean): this
    {
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
    // v7 numeric signature; v8 base class has a deprecated Matrix-based overload
    public setTransform(...args: any[]): this
    {
        const [x = 0, y = 0, scaleX = 1, scaleY = 1, rotation = 0, skewX = 0, skewY = 0, pivotX = 0, pivotY = 0] = args;

        this.position.set(x, y);
        this.scale.set(scaleX, scaleY);
        this.rotation = rotation;
        this.skew.set(skewX, skewY);
        this.pivot.set(pivotX, pivotY);

        return this;
    }
    public t = this.setTransform;

    /**
     * v8 removed Container#name in favor of label; published animate assets
     * assign `.name` directly, so keep it as a first-class alias (no
     * deprecation warning).
     */
    public get name(): string
    {
        return this.label;
    }
    public set name(value: string)
    {
        this.label = value;
    }

    /**
     * Setter for mask to be able to chain.
     * @param mask - The mask shape to use
     * @return Instance for chaining
     */
    public setMask(mask: Graphics | Sprite): this
    {
        // According to PIXI, only Graphics and Sprites can
        // be used as mask, let's ignore everything else, like other
        // movieclips and displayobjects/containers
        if (mask)
        {
            if (!(mask instanceof Graphics) && !(mask instanceof Sprite))
            {
                if (typeof console !== 'undefined' && console.warn)
                {
                    console.warn('Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects.');
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
     * @param alpha - The alpha amount to use, from 0 to 1
     * @return Instance for chaining
     */
    public setAlpha(alpha: number): this
    {
        this.alpha = alpha;

        return this;
    }
    /**
     * Shortcut for `setAlpha`.
     */
    public a = this.setAlpha;

    /**
     * Set the tint values by color.
     * @param tint - The color value to tint
     * @return Object for chaining
     */
    public setTint(tint: string | number): this
    {
        if (typeof tint === 'string')
        {
            tint = utils.hexToUint(tint);
        }
        // this.tint = tint
        // return this;
        // TODO: Replace with DisplayObject.tint setter
        // once the functionality is added to Pixi.js, for
        // now we'll use the slower ColorMatrixFilter to handle
        // the color transformation
        const r = (tint >> 16) & 0xFF;
        const g = (tint >> 8) & 0xFF;
        const b = tint & 0xFF;

        return this.setColorTransform(r / 255, 0, g / 255, 0, b / 255, 0);
    }
    /**
     * Shortcut for `setTint`.
     */
    public i = this.setTint;

    /**
     * Set additive and multiply color, tinting
     * @param r - The multiply red value
     * @param rA - The additive red value
     * @param g - The multiply green value
     * @param gA - The additive green value
     * @param b - The multiply blue value
     * @param bA - The additive blue value
     * @return Object for chaining
     */
    public setColorTransform(r: number, rA: number, g: number, gA: number, b: number, bA: number): this
    {
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
    // method instead of direct reference to allow override in v1 shim
    public c(r: number, rA: number, g: number, gA: number, b: number, bA: number): this
    {
        return this.setColorTransform(r, rA, g, gA, b, bA);
    }
    // public c = this.setColorTransform;

    protected _colorTransformFilter: ColorMatrixFilter;
    /**
     * The current default color transforming filter
     */
    public set colorTransformFilter(filter: ColorMatrixFilter)
    {
        this._colorTransformFilter = filter;
    }
    public get colorTransformFilter(): ColorMatrixFilter
    {
        return this._colorTransformFilter || new ColorMatrixFilter();
    }
}
