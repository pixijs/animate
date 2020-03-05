"use strict";

require('pixi.js');

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
// assigning here because /dist/pixi-animate.js is designed for <script> inclusion, not require().
global.PIXI.animate = require('../dist/pixi-animate').PIXI.animate;
// require the asset shim, for our render tests
require('../v1-asset-shim');

describe('PIXI', function() {

    require('./mixins/Container');
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

const renders = document.createElement('div');
renders.id = "renders-failed";
document.body.appendChild(renders);

require('./renders');