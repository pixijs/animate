"use strict";

module.exports = function(plugins, done) {
    return function(err) {
        let error = plugins.chalk.red;
        let stack = String(err.stack);
        stack = stack.substr(stack.indexOf('\n') + 1);
        console.error(error.bold(err));
        console.error(error(stack));
        done();
    }    
};