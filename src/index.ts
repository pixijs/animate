/// <reference path="../typings/main.d.ts" />
import animate from './animate';

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
    throw "Requires PIXI";
}

// Assign to global namespace
(<any>PIXI).animate = animate;