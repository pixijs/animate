import animate from './animate';

// Check for window, fallback to global
const global = typeof window !== 'undefined' ? window : GLOBAL;

require('./mixins');

// Export for Node-compatible environments like Electron
if (typeof module !== 'undefined' && module.exports)
{
    // Attempt to require the pixi module
    if (typeof PIXI === 'undefined')
    {
        // Include the Pixi.js module
        require('pixi.js');
    }

    // Export the module
    module.exports = animate;
}
// If we're in the browser make sure PIXI is available 
else if (typeof PIXI === 'undefined')
{
    // @if DEBUG
    throw "PixiAnimate requires PIXI to be loaded before PixiAnimate is loaded!";
    // @endif
    // @if RELEASE
    throw "Requires PIXI"; // eslint-disable-line no-unreachable
    // @endif
}

// Assign to global namespace
global.PIXI.animate = animate;