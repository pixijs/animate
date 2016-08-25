describe('Text', function() {
    it('should have shortened names', function() {
        var p = PIXI.Text.prototype;
        assert.isOk(p.setStyle);
        assert.isOk(p.ss);
        assert.equal(p.setStyle, p.ss);
        assert.isOk(p.setAlign);
        assert.isOk(p.g);
        assert.equal(p.setAlign, p.g);
        assert.isOk(p.setShadow);
        assert.isOk(p.sh);
        assert.equal(p.setShadow, p.sh);
    });
});