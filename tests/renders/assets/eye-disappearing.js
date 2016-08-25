(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;

    lib.Graphic1 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("Jibo_Eye1"))
            .setTransform(-79.05, -75.9, 1.001, 1.001);
        this.addChild(instance1);
    });

    var Graphic2 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 2, loop: false });
        var instance1 = new Sprite(fromFrame("Jibo_Eye1"))
            .setTransform(-79.05, -75.9, 1.001, 1.001);
        this.addTimedChild(instance1);
    });

    lib.eye_disappearing = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 3,
            framerate: 30
        });
        var instance1 = new lib.Graphic1();
        var instance2 = new Graphic2(MovieClip.SYNCHED);
        this.addTimedChild(instance1, 0, 1, {
                "0": {
                    x: 8.15,
                    y: 7.25,
                    sx: 0.055,
                    sy: 0.057
                }
            })
            .addTimedChild(instance2, 1, 2, {
                "1": {
                    x: 8.15,
                    y: 7.25,
                    sx: 0.055,
                    sy: 0.057
                },
                "2": {
                    x: 7.7,
                    y: 6.75,
                    sx: 0.058,
                    sy: 0.06,
                    c: [
                        0.8,
                        0.2,
                        0.8,
                        0.2,
                        0.8,
                        0.2
                    ]
                }
            });
    });

    lib.eye_disappearing.assets = [
        [
            "Jibo_Eye1",
            "images/Jibo_Eye1.png"
        ]
    ];
})(PIXI, lib = lib || {});
var lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: lib.eye_disappearing,
        background: 0x0,
        width: 32,
        height: 32,
        framerate: 30,
        totalFrames: 3,
        library: lib
    };
}