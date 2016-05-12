(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.bitmap = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 24
        });
        var instance1 = new Sprite(fromFrame("Bitmap_1"))
            .setTransform(4, 4);
        this.addChild(instance1);
    });

    lib.bitmap.assets = [
        [
            "Bitmap_1",
            "images/Bitmap_1.png"
        ]
    ];
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.bitmap,
        background: 0xffffff,
        width: 32,
        height: 32,
        framerate: 24,
        totalFrames: 1,
        library: lib
    };
}