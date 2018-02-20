'use strict';

const yargs = require('yargs');

module.exports = (useStrict = true) => {
    let wrapper = yargs
        .help();

    if (useStrict) {
        wrapper = yargs.strict();
    }

    return wrapper;
}
