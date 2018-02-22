'use strict';

const yargs = require('yargs');

export const yargsWrapper = (useStrict = true) => {
    let wrapper = yargs
        .help();

    if (useStrict) {
        wrapper = yargs.strict();
    }

    return wrapper;
}
