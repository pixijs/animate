"use strict";

require('./shim');

var assert = require('chai').assert;
var animate = require('../dist/pixi-animate');

function extendable(classRef) {
    assert.isOk(classRef.extend);
    assert.isOk(classRef.e);
    assert.equal(classRef.extend, classRef.e);
    var CustomClass = classRef.extend(function() {
        classRef.call(this);
    });
    var obj1 = new CustomClass();
    assert.isOk(obj1 instanceof classRef);
}

describe('PIXI.animate.utils', function() {
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
        var shapes = "alias_1 f #000 1 m 185.5 59.75 l 180.65 74.1 "+
            "l 192.85 83.15 l 205.2 74.3 l 200.65 59.85 l 185.5 59.75 c\n"+
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

describe('PIXI.animate.load', function() {
    it('should exist', function() {
        assert.isOk(PIXI.animate.load);
    });
});

describe('PIXI.animate.Timeline', function() {
    it('should exist', function() {
        assert.isOk(PIXI.animate.Timeline);
    });
});

describe('PIXI.animate.Tween', function() {
    it('should exist', function() {
        assert.isOk(PIXI.animate.Tween);
    });
});

describe('PIXI.animate.MovieClip', function() {
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

describe('PIXI.animate.ShapesCache', function() {
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

describe('PIXI.DisplayObject', function() {
    it('should have shortened names', function() {
        var p = PIXI.DisplayObject.prototype;
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
    it('should be extendable', function() {
        extendable(PIXI.DisplayObject);
    });
});


describe('PIXI.Graphics', function() {
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

describe('PIXI.Container', function() {
    it('should have shortened names', function() {
        var p = PIXI.Container.prototype;
        assert(p.ac, p.addChild);
    });
    it('should be extendable', function() {
        extendable(PIXI.Container);
    });
});

describe('PIXI.Sprite', function() {
    it('should be extendable', function() {
        extendable(PIXI.Sprite);
    });
});

describe('PIXI.Text', function() {
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