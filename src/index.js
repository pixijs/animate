// Export for Node-compatible environments like Electron
if (typeof module !== 'undefined' && module.exports) {
    // Attempt to require the pixi module
    if (typeof PIXI === 'undefined') {
        // Include the Pixi.js module
        // @if DEBUG
        require('pixi.js/bin/pixi.js');
        // @endif
        // @if RELEASE
        require('pixi.js/bin/pixi.min.js');
        // @endif
    }

    // Export the module
    module.exports = require('./animate').default;
}
// If we're in the browser make sure PIXI is available 
else if (typeof PIXI === 'undefined') {
    throw "Requires PIXI";
}

// Include the PIXI mixins
require('./mixins');

// Assign to global namespace
PIXI.animate = require('./animate').default;