describe('MovieClip', function() {
    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    it('should exist', function() {
        assert.isOk(MovieClip);
    });
    it('should be extendable', function() {
        assert.isOk(MovieClip);
        assert.isOk(Container);
        var clip = new MovieClip();
        assert.isOk(clip instanceof Container);
    });
});