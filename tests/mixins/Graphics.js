describe('Graphics', function() {
    it('should have DisplayObject shortened names', function() {
        var p = new PIXI.animate.Graphics();
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
        // NOTE: Graphics overrides c(), which is bad, but a breaking change to fix
        // assert.isOk(p.c);
        assert.isOk(p.setColorTransform);
        // assert.equal(p.setColorTransform, p.c);
    });
    it('should have shortened names', function() {
        var p = new PIXI.animate.Graphics();
        assert.isOk(p.drawCommands);
        assert.isOk(p.d);
        assert.equal(p.drawCommands, p.d);
        assert.equal(p.c, p.closePath);
        assert.equal(p.h, p.addHole);
        assert.equal(p.m, p.moveTo);
        assert.equal(p.l, p.lineTo);
        assert.equal(p.q, p.quadraticCurveTo);
        assert.equal(p.b, p.bezierCurveTo);
        assert.equal(p.f, p.beginFill);
        assert.equal(p.s, p.lineStyle);
        assert.equal(p.dr, p.drawRect);
        assert.equal(p.rr, p.drawRoundedRect);
        assert.equal(p.dc, p.drawCircle);
        assert.equal(p.ar, p.arc);
        assert.equal(p.at, p.arcTo);
        assert.equal(p.de, p.drawEllipse);
    });
});