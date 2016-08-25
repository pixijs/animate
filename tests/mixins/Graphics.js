describe('Graphics', function() {
    it('should have shortened names', function() {
        var p = PIXI.Graphics.prototype;
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