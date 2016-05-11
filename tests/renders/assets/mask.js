(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.mask = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 4,
            framerate: 30
        });
        var instance2 = new Graphics()
            .drawCommands(shapes.mask_1)
            .setRenderable(false);
        var instance3 = new Graphics()
            .drawCommands(shapes.mask_2)
            .setRenderable(false);
        var instance1 = new Graphics()
            .drawCommands(shapes.mask_3);
        this.addTimedChild(instance2, 1, 1)
            .addTimedChild(instance3, 2, 1)
            .addTimedMask(instance1, {
                "1": instance2,
                "2": instance3,
                "3": null
            })
            .addTimedChild(instance1);
    });

    lib.mask.assets = [
        "images/mask.shapes.json"
    ];
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.mask,
        background: 0xffffff,
        width: 32,
        height: 32,
        framerate: 30,
        totalFrames: 4,
        library: lib
    };
}