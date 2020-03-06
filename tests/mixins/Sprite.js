const {Sprite} = require('../..');

describe('Sprite', function() {
    it('should have DisplayObject shortened names', function() {
        var p = new Sprite();
        assert.isOk(p.setRenderable);
        assert.isOk(p.re);
        assert.equal(p.setRenderable, p.re);
        assert.isOk(p.t);
        assert.equal(p.setTransform, p.t);
        assert.isOk(p.ma);
        assert.isOk(p.setMask);
        assert.equal(p.setMask, p.ma);
        assert.isOk(p.a);
        assert.isOk(p.setAlpha);
        assert.equal(p.setAlpha, p.a);
        assert.isOk(p.i);
        assert.isOk(p.setTint);
        assert.equal(p.setTint, p.i);
        assert.isOk(p.c);
        assert.isOk(p.setColorTransform);
        assert.equal(p.setColorTransform, p.c);
    });
    
    describe('legacy', function() {
        it('should override base', function() {
            assert.equal(PIXI.Sprite, PIXI.animate.Sprite);
        });
        
        it('should be extendable', function() {
            extendable(PIXI.Sprite);
        });
    });
});