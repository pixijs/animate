import * as PIXI from 'pixi.js';
import * as animate from '../../../src/index';

import crypto from 'crypto';
import path from 'path';
import { ImageDiff } from './imagediff';

/**
 * Class to create solutions
 * @class Renderer
 * @constructor
 */
export class Renderer
{
    stage: PIXI.Container;
    webgl: PIXI.Renderer;
    view: PIXI.ICanvas;
    static WIDTH = 32;
    static HEIGHT = 32;
    static TOLERANCE = 0.1;
    instance: animate.MovieClip | null;
    imagediff: ImageDiff;
    constructor(viewWebGL:PIXI.ICanvas)
    {
        this.stage = new PIXI.Container();
        this.webgl = new PIXI.Renderer({
            width: Renderer.WIDTH,
            height: Renderer.HEIGHT,
            view: viewWebGL,
            backgroundColor: 0xffffff,
            antialias: false,
            preserveDrawingBuffer: true,
        });
        this.view = viewWebGL;
        this.render();

        this.instance = null;
        this.imagediff = new ImageDiff(Renderer.WIDTH, Renderer.HEIGHT);
    }

    /**
     * Rerender the stage
     * @method render
     */
    render()
    {
        this.webgl.render(this.stage);
    }

    /**
     * Clear the stage
     * @method clear
     */
    clear()
    {
        this.stage.removeChildren();
        if (this.instance)
        {
            this.instance.destroy(true);
            this.instance = null;
        }
        this.render();
    }

    /**
     * Run the solution renderer
     * @method run
     * @param file -  Fully resolved path
     * @param callback -  Takes error and result as arguments
     */
    async run(file, callback)
    {
        delete require.cache[path.resolve(file)];
        const fla = (await import(file)).default;

        if (!Object.keys(fla).length || !fla.setup)
        {
            // eslint-disable-next-line max-len
            callback(new Error('Invalid PixiAnimate format, make sure to enable "CommonJS Compatible Output" option in the Adobe Animate publishing settings.'));

            return;
        }
        fla.setup(animate);
        animate.load(fla, {
            basePath: path.dirname(file),
            createInstance: true,
            complete: (instance) =>
            {
                if (!instance)
                {
                    callback(new Error('Failed to create instance'));

                    return;
                }

                this.clear();
                this.instance = instance;
                this.stage.addChild(instance);
                const result = {
                    webgl: [] as any[],
                };

                for (let i = 0; i < fla.totalFrames; i++)
                {
                    instance.gotoAndStop(i);
                    this.render();
                    const data = this.view.toDataURL ? this.view.toDataURL() : '';

                    result.webgl.push({
                        // hash: md5(data),
                        hash: crypto.createHash('md5').update(data).digest('hex'),
                        image: data,
                    });
                }
                callback(null, result);
            },
        });
    }

    /**
     * Compare a file with a solution.
     * @method compare
     * @param file -  The file to load.
     * @param solution -
     * @param callback -  Complete callback, takes err as an error and success boolean as args.
     */
    compare(file, solution, callback)
    {
        this.run(file, async (err, result) =>
        {
            if (err)
            {
                callback(err);

                return;
            }
            const compareResult = await this.compareFrames(solution.webgl, result.webgl, Renderer.TOLERANCE);

            if (compareResult !== true)
            {
                callback(new Error(`WebGL results do not match: ${compareResult}.`));

                return;
            }
            callback(null, true);
        });
    }

    /**
     * Compare two arrays of frames
     * @method compareFrames
     * @private
     * @param a -
     * @param b -
     * @return {Boolean} If we're equal
     */
    async compareFrames(a, b, tolerance)
    {
        if (a === b)
        {
            return true;
        }
        if (a === null || b === null)
        {
            return 'null render';
        }

        const length = a.length;

        if (b.length !== length)
        {
            return `unequal length: ${length} : ${b.length}`;
        }

        for (let i = 0; i < length; i++)
        {
            if (a[i].hash !== b[i].hash)
            {
                if (!await this.imagediff.compare(a[i].image, b[i].image, tolerance))
                {
                    const renders = document.getElementById('renders-failed') as HTMLElement;

                    renders.innerHTML += `<img width="32" height"32" style="border:1px solid #999" src="${a[i].image}">`;
                    renders.innerHTML += `<img width="32" height"32" style="border:1px solid #999" src="${b[i].image}">`;
                    renders.innerHTML += '&nbsp;&nbsp;';

                    return `frame ${i}`;
                }
            }
        }

        return true;
    }
}
