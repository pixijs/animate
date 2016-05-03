describe('ShapesCache', function() {
    var ShapesCache = PIXI.animate.ShapesCache;
    it('should exist', function() {
        assert.isOk(ShapesCache);
    });
    it('should add shapes to cache', function() {
        var commands = [
            "f", "#003fcc", 1,
            "m", 363.05, 287.3,
            "l", 431.2, 208.5,
            "l", 377.4, 119.35,
            "l", 275.95, 143,
            "l", 267.05, 246.75,
            "l", 363.05, 287.3,
            "c"
        ];
        ShapesCache.add('TestShape2', commands);
        assert.isOk(ShapesCache.TestShape2);
        assert.equal(ShapesCache.TestShape2, commands);
        assert.equal(ShapesCache.fromCache('TestShape2'), commands);
        ShapesCache.removeAll();
    });
    it('should decode images', function() {
        var map = ShapesCache.decode("TestShape f #cc009d 1 m 356 327.95 l 356 183 l 212.05 183 l 212.05 327.95 l 356 327.95 c");
        assert.equal(typeof map, 'object');
        assert.isOk(map.TestShape);
        ShapesCache.add(map);
        assert.isOk(ShapesCache.TestShape);
        assert.equal(ShapesCache.TestShape.length, 19);
        assert.equal(ShapesCache.TestShape[1], 0xcc009d);
        ShapesCache.remove('TestShape');
        assert.isNotOk(ShapesCache.TestShape);
    });
});