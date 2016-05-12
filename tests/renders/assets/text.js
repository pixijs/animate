(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Text = PIXI.Text;

    lib.text = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 24
        });
        var instance1 = new Text("Text")
            .setStyle({
                font: "12px Arial"
            })
            .setRenderable(false)
            .setTransform(3.45, 8.7)
            .setMask(instance1);
        this.addChild(instance1);
    });

    lib.text.assets = [];
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.text,
        background: 0xffffff,
        width: 32,
        height: 32,
        framerate: 24,
        totalFrames: 1,
        library: lib
    };
}