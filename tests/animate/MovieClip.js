const animate = require('../..');
const {Container} = require('pixi.js');

describe('MovieClip', function() {
    var MovieClip = animate.MovieClip;
    it('should exist', function() {
        assert.isOk(MovieClip);
    });
    it('should be extendable', function() {
        assert.isOk(MovieClip);
        assert.isOk(Container);
        var clip = new MovieClip();
        assert.isOk(clip instanceof Container);
        assert.isOk(clip instanceof animate.Container);
    });
});