"use strict";

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

global.extendable = extendable;
global.assert = global.chai.assert;
global.animate = require('../dist/pixi-animate');

describe('PIXI', function() {

    require('./mixins/Container');
    require('./mixins/DisplayObject');
    require('./mixins/Graphics');
    require('./mixins/Sprite');
    require('./mixins/Text');

    describe('animate', function() {

        require('./animate/load');
        require('./animate/MovieClip');
        require('./animate/ShapesCache');
        require('./animate/Timeline');
        require('./animate/Tween');
        require('./animate/utils');
    });
});

require('./renders');