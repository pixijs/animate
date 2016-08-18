// Export for Node-compatible environments like Electron
if (typeof module !== 'undefined' && module.exports) {
    // Export the module
    module.exports = require('./animate').default;
}
// If we're in the browser make sure PIXI is available
if (typeof PIXI === 'undefined') {
    throw "Requires PIXI";
}

// Include the PIXI mixins
require('./mixins');

// Assign to global namespace
PIXI.animate = require('./animate').default;
PIXI.animate.VERSION = '__VERSION__';