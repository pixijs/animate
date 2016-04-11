"use strict";

if (typeof window === "undefined") {
    // Required for all
    GLOBAL.window = GLOBAL;

    // Required for sinon
    GLOBAL.location = {
        host: 'localhost',
        protocol: 0
    };

    // Required for pixi.js 
    GLOBAL.navigator = {
        userAgent: ''
    };
    GLOBAL.document = {
        createElement: function() {
            return {
                getContext: function() {
                    return {
                        globalCompositeOperation: null,
                        drawImage: function() {},
                        getImageData: function() {
                            return {
                                data: [0, 0, 0]
                            };
                        }
                    };
                }
            };
        }
    };
    GLOBAL.Image = function() {};
}