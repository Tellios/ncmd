'use strict';

const yargs = require('yargs');

module.exports = () => {
    return yargs
        .strict()
        .help();
}
