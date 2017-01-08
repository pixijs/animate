// If we're in the browser make sure PIXI is available
if (typeof PIXI === 'undefined') {
    throw "Requires PIXI";
}

if (!PIXI.animate) {
    // Include the PIXI mixins
    require('./mixins');

    // Add to the PIXI global object
    Object.defineProperty(PIXI, 'animate', {
        enumerable: true,
        get() { return require('./animate'); }
    });
}

// Export for Node-compatible environments like Electron
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PIXI.animate;
}
