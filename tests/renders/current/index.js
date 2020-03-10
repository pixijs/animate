const PIXI = require('pixi.js');
const animate = require('../../../');

describe('Renders - Current asset format', function() {
    before(function(){
        PIXI.utils.skipHello();
        var Renderer = require('./renderer');
        var webgl = this.webgl = document.createElement('canvas');
        document.body.appendChild(webgl);
        this.renderer = new Renderer(webgl);
        this.validate = function(id, tolerance, done) {
            if (typeof tolerance === "function") {
                done = tolerance;
                tolerance = Renderer.TOLERANCE;
            }
            // Override the tolerance
            var path = require('path');
            var solution = path.resolve(__dirname, '..', 'solutions', id + '.json');
            var fla = path.join(__dirname, 'assets', id + '.js');
            this.renderer.imagediff.tolerance = tolerance;
            this.renderer.compare(fla, require(solution), function(err, success) {
                if (err) {
                    return done(err.message);
                }
                done(success ? undefined : 'Render not successful');
            });
        };

        this.getInstance = function(id, done) {
            var path = require('path');
            var file = path.join(__dirname, 'assets', id + '.js');
            delete require.cache[path.resolve(file)];
            var fla = require(file);
            animate.load(fla, {
                createInstance: true,
                complete: done,
                basePath: path.join(__dirname, 'assets')
            });
        };
    });

    beforeEach(function(){
        this.renderer.clear();
    });

    after(function(){
        this.webgl.parentNode.removeChild(this.webgl);
        this.webgl = null;
        this.renderer = null;
        this.getInstance = null;
        this.validate = null;
    });

    // -------------- Tests begin here --------------

    it('should render advanced color', function(done){
        this.validate('advanced-color', done);
    });

    it.skip('should render an alpha', function(done){
        this.validate('alpha', done);
    });

    it.skip('should render a bitmap', function(done){
        this.validate('bitmap', done);
    });

    // it('should render a bitmap mask', function(done){
    //     this.validate('bitmap-mask', done);
    // });
    //
    // it('should render a bitmap mask with transparency', function(done){
    //     this.validate('bitmap-mask-transparent', done);
    // });

    it.skip('should render a bitmap inside a symbol', function(done){
        this.validate('bitmap-symbol', done);
    });

    it.skip('should render brightness', function(done){
        this.validate('brightness', done);
    });

    it.skip('should render depth sorting (single frame)', function(done){
        this.validate('depth-sorting', done);
    });

    it.skip('should render depth sorting over the timeline', function(done){
        this.validate('depth-sorting-timeline', done);
    });

    // it('should render no disappearing eye', function(done){
    //     this.validate('eye-disappearing', done);
    // });

    it.skip('should render end-of-timeline only', function(done){
        this.validate('end-only', done);
    });

    it.skip('should render a graphic', function(done){
        this.validate('graphic', done);
    });

    it.skip('should render a graphic set to "loop"', function(done){
        this.validate('graphic-loop', done);
    });

    it.skip('should render a graphic animating on a path', function(done){
        this.validate('graphic-path', done);
    });

    it.skip('should render a graphic set to "play once"', function(done){
        this.validate('graphic-playonce', done);
    });

    it.skip('should render a graphic set to "single frame"', function(done){
        this.validate('graphic-singleframe', done);
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

    it.skip('should render a mask inside a symbol', function(done){
        this.validate('mask-nested', done);
    });

    // it('should render a tweened mask', function(done){
    //     this.validate('mask-tween', done);
    // });

    it.skip('should render a mask', function(done){
        this.validate('mask', done);
    });

    it.skip('should render a shape primitive mask', function(done){
        this.validate('mask-primitive', done);
    });

    it.skip('should render a nested mixed transformation (scale/skew/rotate)', function(done){
        this.validate('nested-mixed-transform', done);
    });

    it.skip('should render a nested rotation', function(done){
        this.validate('nested-rotate', done);
    });

    it.skip('should render a nested scale', function(done){
        this.validate('nested-scale', done);
    });

    it.skip('should render a nested skew', function(done){
        this.validate('nested-skew', 0.05, done);
    });

    it.skip('should render only the middle of the timeline', function(done){
        this.validate('no-start-end', done);
    });

    it.skip('should render only the start of the timeline', function(done){
        this.validate('start-only', done);
    });

    // it('should render text', function(done){
    //     this.validate('text', done);
    // });

    it.skip('should render a tint', function(done){
        this.validate('tint', done);
    });

    it.skip('should render a tween from alpha to tint', function(done){
        this.validate('tween-alpha-tint', done);
    });

    it.skip('should render a nested graphics tween', function(done){
        this.validate('tween-nested-graphics', done);
    });

    it.skip('should render a nested movieclip tween', function(done){
        this.validate('tween-nested-movieclip', done);
    });

    it.skip('should render multiple instances of a nested tween', function(done){
        this.validate('tween-nested-multiple-instances', done);
    });

    it.skip('should render a tween from normal to advanced color', function(done){
        this.validate('tween-normal-advanced', done);
    });

    it.skip('should render a tween from normal to alpha', function(done){
        this.validate('tween-normal-alpha', done);
    });

    it.skip('should render a tween from normal to brightness', function(done){
        this.validate('tween-normal-brightness', done);
    });

    it.skip('should render a tween from normal to tint', function(done){
        this.validate('tween-normal-tint', done);
    });

    it.skip('should render a rotating tween', function(done){
        this.validate('tween-rotate', done);
    });

    it.skip('should render a tween scaling uniformly', function(done){
        this.validate('tween-scale-uniform', done);
    });

    it.skip('should render a tween scaling horizontally', function(done){
        this.validate('tween-scale-x', done);
    });

    it.skip('should render a tween scaling vertically', function(done){
        this.validate('tween-scale-y', done);
    });

    it.skip('should render a tween skewing x and y', function(done){
        this.validate('tween-skew-both', 0.06, done);
    });

    it.skip('should render a tween skewing horizontally', function(done){
        this.validate('tween-skew-x', done);
    });

    it.skip('should render a tween skewing vertically', function(done){
        this.validate('tween-skew-y', 0.05, done);
    });

    it.skip('should render a tween from one tint to another', function(done){
        this.validate('tween-tint-tint', done);
    });

    it.skip('should render a tween along both x and y axes', function(done){
        this.validate('tween-x-y', done);
    });

    it.skip('should render a horizontal tween', function(done){
        this.validate('tween-x', done);
    });

    it.skip('should render a vertical tween', function(done){
        this.validate('tween-y', done);
    });

    it.skip('should render visibility toggling on/off', function(done){
        this.validate('visible', done);
    });

    it.skip('should work for actions', function(done) {
        this.getInstance('actions', (instance) => {
            instance.once('actionsWork', () => {
                done();
            });
            this.renderer.stage.addChild(instance);
            instance.play();
        });
    });

    it.skip('should work for named instances', function(done) {
        this.getInstance('named-instance', (instance) => {
            assert(instance.example, 'Missing named instance');
            done();
        });
    });
});
