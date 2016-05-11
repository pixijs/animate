describe('Renders', function() {
    before(function(){
        var Renderer = require('./Renderer');
        var webgl = this.webgl = document.createElement('canvas');
        var canvas = this.canvas = document.createElement('canvas');
        document.body.appendChild(webgl);
        document.body.appendChild(canvas);
        this.renderer = new Renderer(webgl, canvas);
        this.validate = function(id, done) {
            var path = require('path');
            var solution = path.join(__dirname, 'solutions', id + '.json');
            var fla = path.join(__dirname, 'assets', id + '.js');
            this.renderer.compare(fla, require(solution), function(err, success) {
                if (err) {
                    assert(false, err.message);
                }
                assert(success, 'Render not successful');
                done();
            });
        };
    });

    beforeEach(function(){
        this.renderer.clear();
    });

    after(function(){
        this.webgl.parentNode.removeChild(this.webgl);
        this.canvas.parentNode.removeChild(this.canvas);
        this.webgl = null;
        this.canvas = null;
        this.renderer = null;
    });

    // -------------- Tests begin here --------------

    it('should render advanced color', function(done){
        this.validate('advanced-color', done);
    });

    it('should render an alpha', function(done){
        this.validate('alpha', done);
    });

    it('should render brightness', function(done){
        this.validate('brightness', done);
    });

    it('should render end-of-timeline only', function(done){
        this.validate('end-only', done);
    });

    it('should render a graphic', function(done){
        this.validate('graphic', done);
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

    it('should render a mask inside a symbol', function(done){
        this.validate('mask-nested', done);
    });

    // it('should render a tweened mask', function(done){
    //     this.validate('mask-tween', done);
    // });

    it('should render a mask', function(done){
        this.validate('mask', done);
    });

    it('should render only the middle of the timeline', function(done){
        this.validate('no-start-end', done);
    });

    it('should render only the start of the timeline', function(done){
        this.validate('start-only', done);
    });

    it('should render a tint', function(done){
        this.validate('tint', done);
    });

    it('should render a tween from alpha to tint', function(done){
        this.validate('tween-alpha-tint', done);
    });

    it('should render a nested graphics tween', function(done){
        this.validate('tween-nested-graphics', done);
    });

    it('should render a tween from normal to advanced color', function(done){
        this.validate('tween-normal-advanced', done);
    });

    it('should render a tween from normal to alpha', function(done){
        this.validate('tween-normal-alpha', done);
    });

    it('should render a tween from normal to brightness', function(done){
        this.validate('tween-normal-brightness', done);
    });

    it('should render a tween from normal to tint', function(done){
        this.validate('tween-normal-tint', done);
    });

    it('should render a rotating tween', function(done){
        this.validate('tween-rotate', done);
    });

    it('should render a tween scaling uniformly', function(done){
        this.validate('tween-scale-uniform', done);
    });

    it('should render a tween scaling horizontally', function(done){
        this.validate('tween-scale-x', done);
    });

    it('should render a tween scaling vertically', function(done){
        this.validate('tween-scale-y', done);
    });

    it('should render a tween skewing x and y', function(done){
        this.validate('tween-skew-both', done);
    });

    it('should render a tween skewing horizontally', function(done){
        this.validate('tween-skew-x', done);
    });

    it('should render a tween skewing vertically', function(done){
        this.validate('tween-skew-y', done);
    });

    it('should render a tween from one tint to another', function(done){
        this.validate('tween-tint-tint', done);
    });

    it('should render a tween along both x and y axes', function(done){
        this.validate('tween-x-y', done);
    });

    it('should render a horizontal tween', function(done){
        this.validate('tween-x', done);
    });

    it('should render a vertical tween', function(done){
        this.validate('tween-y', done);
    });

    it('should render visibility toggling on/off', function(done){
        this.validate('visible', done);
    });
});
