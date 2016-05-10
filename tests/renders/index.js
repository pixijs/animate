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

    it('should render a graphic', function(done){
        this.validate('graphic', done);
    });
});