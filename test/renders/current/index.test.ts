import * as animate from '../../../src/index';
import path from 'path';
import { Renderer } from './renderer';

describe('Renders - Current asset format', () =>
{
    let testContext;

    beforeAll(() =>
    {
        if (!testContext) testContext = {};

        testContext.webgl = document.createElement('canvas');
        const webgl = testContext.webgl;

        testContext = {};
        document.body.appendChild(webgl);
        testContext.renderer = new Renderer(webgl);
        testContext.validate = async (id, tolerance, done) =>
        {
            if (typeof tolerance === 'function')
            {
                done = tolerance;
                tolerance = Renderer.TOLERANCE;
            }
            // Override the tolerance
            const solution = path.resolve(__dirname, '..', 'solutions', `${id}.json`);
            const fla = path.join(__dirname, 'assets', `${id}.js`);

            testContext.renderer.imagediff.tolerance = tolerance;
            testContext.renderer.compare(fla, (await import(solution)).default, (err, success) =>
            {
                if (err)
                {
                    done(err.message);

                    return;
                }
                done(success ? undefined : 'Render not successful');
            });
        };

        testContext.getInstance = async (id, done) =>
        {
            const file = path.join(__dirname, 'assets', `${id}.js`);

            delete require.cache[path.resolve(file)];
            const fla = (await import(file)).default;

            fla.setup(animate);
            animate.load(fla, {
                createInstance: true,
                complete: done,
                basePath: path.join(__dirname, 'assets'),
            });
        };
    });

    beforeEach(() =>
    {
        testContext.renderer.clear();
    });

    afterAll(() =>
    {
        if (testContext)
        {
            testContext.webgl?.parentNode.removeChild(testContext.webgl);
            testContext.webgl = null;
            testContext.renderer = null;
            testContext.getInstance = null;
            testContext.validate = null;
        }
        else
        {
            testContext = {};
        }
    });

    // -------------- Tests begin here --------------

    it('should render advanced color', (done) =>
    {
        testContext.validate('advanced-color', done);
    });

    it('should render an alpha', (done) =>
    {
        testContext.validate('alpha', done);
    });

    it('should render a bitmap', (done) =>
    {
        testContext.validate('bitmap', done);
    });

    // it('should render a bitmap mask', function(done){
    //     this.validate('bitmap-mask', done);
    // });
    //
    // it('should render a bitmap mask with transparency', function(done){
    //     this.validate('bitmap-mask-transparent', done);
    // });

    it('should render a bitmap inside a symbol', (done) =>
    {
        testContext.validate('bitmap-symbol', done);
    });

    it('should render brightness', (done) =>
    {
        testContext.validate('brightness', done);
    });

    it('should render depth sorting (single frame)', (done) =>
    {
        testContext.validate('depth-sorting', done);
    });

    it('should render depth sorting over the timeline', (done) =>
    {
        testContext.validate('depth-sorting-timeline', done);
    });

    it('should render end-of-timeline only', (done) =>
    {
        testContext.validate('end-only', done);
    });

    it('should render a graphic', (done) =>
    {
        testContext.validate('graphic', done);
    });

    it('should render a graphic set to "loop"', (done) =>
    {
        testContext.validate('graphic-loop', done);
    });

    it('should render a graphic animating on a path', (done) =>
    {
        testContext.validate('graphic-path', done);
    });

    it('should render a graphic set to "play once"', (done) =>
    {
        testContext.validate('graphic-playonce', done);
    });

    it('should render a graphic set to "single frame"', (done) =>
    {
        testContext.validate('graphic-singleframe', done);
    });

    it('should render a hole', (done) =>
    {
        testContext.validate('hole', done);
    });

    // it('should render a graphic mask', function(done){
    //     this.validate('mask-graphic', done);
    // });
    //
    // it('should render a movie clip mask', function(done){
    //     this.validate('mask-movieclip', done);
    // });
    //
    // it('should render a tweened mask inside a symbol', function(done){
    //     this.validate('mask-nested-tween', done);
    // });

    it('should render a mask inside a symbol', (done) =>
    {
        testContext.validate('mask-nested', done);
    });

    // it('should render a tweened mask', function(done){
    //     this.validate('mask-tween', done);
    // });

    it('should render a mask', (done) =>
    {
        testContext.validate('mask', done);
    });

    it('should render a shape primitive mask', (done) =>
    {
        testContext.validate('mask-primitive', done);
    });

    it(
        'should render a nested mixed transformation (scale/skew/rotate)',
        (done) =>
        {
            testContext.validate('nested-mixed-transform', done);
        }
    );

    it('should render a nested rotation', (done) =>
    {
        testContext.validate('nested-rotate', done);
    });

    it('should render a nested scale', (done) =>
    {
        testContext.validate('nested-scale', done);
    });

    it('should render a nested skew', (done) =>
    {
        testContext.validate('nested-skew', 0.05, done);
    });

    it('should render only the middle of the timeline', (done) =>
    {
        testContext.validate('no-start-end', done);
    });

    it('should render only the start of the timeline', (done) =>
    {
        testContext.validate('start-only', done);
    });

    // it('should render text', function(done){
    //     this.validate('text', done);
    // });

    it('should render a tint', (done) =>
    {
        testContext.validate('tint', done);
    });

    it('should render a tween from alpha to tint', (done) =>
    {
        testContext.validate('tween-alpha-tint', done);
    });

    it('should render a nested graphics tween', (done) =>
    {
        testContext.validate('tween-nested-graphics', done);
    });

    it('should render a nested movieclip tween', (done) =>
    {
        testContext.validate('tween-nested-movieclip', done);
    });

    it('should render multiple instances of a nested tween', (done) =>
    {
        testContext.validate('tween-nested-multiple-instances', done);
    });

    it('should render a tween from normal to advanced color', (done) =>
    {
        testContext.validate('tween-normal-advanced', done);
    });

    it('should render a tween from normal to alpha', (done) =>
    {
        testContext.validate('tween-normal-alpha', done);
    });

    it('should render a tween from normal to brightness', (done) =>
    {
        testContext.validate('tween-normal-brightness', done);
    });

    it('should render a tween from normal to tint', (done) =>
    {
        testContext.validate('tween-normal-tint', done);
    });

    it('should render a rotating tween', (done) =>
    {
        testContext.validate('tween-rotate', done);
    });

    it('should render a tween scaling uniformly', (done) =>
    {
        testContext.validate('tween-scale-uniform', done);
    });

    it('should render a tween scaling horizontally', (done) =>
    {
        testContext.validate('tween-scale-x', done);
    });

    it('should render a tween scaling vertically', (done) =>
    {
        testContext.validate('tween-scale-y', done);
    });

    it('should render a tween skewing x and y', (done) =>
    {
        testContext.validate('tween-skew-both', 0.06, done);
    });

    it('should render a tween skewing horizontally', (done) =>
    {
        testContext.validate('tween-skew-x', done);
    });

    it('should render a tween skewing vertically', (done) =>
    {
        testContext.validate('tween-skew-y', 0.05, done);
    });

    it('should render a tween from one tint to another', (done) =>
    {
        testContext.validate('tween-tint-tint', done);
    });

    it('should render a tween along both x and y axes', (done) =>
    {
        testContext.validate('tween-x-y', done);
    });

    it('should render a horizontal tween', (done) =>
    {
        testContext.validate('tween-x', done);
    });

    it('should render a vertical tween', (done) =>
    {
        testContext.validate('tween-y', done);
    });

    it(
        'should render a programmatic tween along both x and y axes',
        (done) =>
        {
            // NOTE: this file was hand made, pending the ability to export true tweens from the extension
            testContext.validate('tween-x-y-programmatic', done);
        }
    );

    it('should render visibility toggling on/off', (done) =>
    {
        testContext.validate('visible', done);
    });

    it('should work for actions', (done) =>
    {
        testContext.getInstance('actions', (instance) =>
        {
            instance.once('actionsWork', () =>
            {
                done();
            });
            testContext.renderer.stage.addChild(instance);
            instance.play();
        });
    });

    it('should work for named instances', (done) =>
    {
        testContext.getInstance('named-instance', (instance) =>
        {
            expect(instance.example).toBeTruthy();
            done();
        });
    });
});
