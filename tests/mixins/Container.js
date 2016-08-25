describe('Container', function() {
    it('should have shortened names', function() {
        var p = PIXI.Container.prototype;
        assert(p.ac, p.addChild);
    });
    it('should be extendable', function() {
        extendable(PIXI.Container);
    });
});