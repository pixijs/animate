describe('utils', function() {
    it('should convert shortened hex strings', function() {
        var color = animate.utils.hexToUint("#fc9");
        assert.equal(parseInt(color), 0xffcc99);
        assert.equal(color, 0xffcc99);
    });
    it('should hanlde long strings', function() {
        var color = animate.utils.hexToUint("#ffcc99");
        assert.equal(color, 0xffcc99);
    });
    it('should convert keyframes', function() {
        var result = animate.utils.deserializeKeyframes("0X-55.05Y-361.05A1B1T#fffF1,2,3 1Y-360.2 2Y-357.6 3Y-353.25");
        assert.equal(typeof result, 'object');
        assert.equal(Object.keys(result).length, 4);
        assert.equal(result['0'].x, -55.05);
        assert.equal(result['0'].y, -361.05);
        assert.equal(result['0'].sx, 1);
        assert.equal(result['0'].sy, 1);
        assert.equal(result['0'].t, '#fff');
        assert(Array.isArray(result['0'].c));
        assert.equal(result['0'].c.length, 3);
        assert.equal(result['0'].c[0], 1);
        assert.equal(result['1'].y, -360.2);
        assert.equal(result['2'].y, -357.6);
        assert.equal(result['3'].y, -353.25);
    });
    it('should fill frames', function() {
        var timeline = [];
        animate.utils.fillFrames(timeline, 3, 10);
        assert.equal(timeline.length, 13);
        assert.equal(timeline[0], false);
        assert.equal(timeline[1], false);
        assert.equal(timeline[2], false);
        assert.equal(timeline[3], true);
        assert.equal(timeline[12], true);
    });

    it('should deserialize shapes', function() {
        var shapes = "alias_1 f #000 1 m 185.5 59.75 l 180.65 74.1 " +
            "l 192.85 83.15 l 205.2 74.3 l 200.65 59.85 l 185.5 59.75 c\n" +
            "alias_2 f #000 1 m 184 61 l 184 79.5 l 202.5 79.5 l 202.5 61 l 184 61 c";
        var map = animate.utils.deserializeShapes(shapes);
        assert(map);
        assert(map.alias_1);
        assert(Array.isArray(map.alias_1));
        assert.equal(map.alias_1.length, 22);
        assert(map.alias_2);
        assert(Array.isArray(map.alias_2));
        assert.equal(map.alias_2.length, 19);
    });
});