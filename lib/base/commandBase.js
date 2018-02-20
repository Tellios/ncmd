'use strict';

const process = require('process');
const consoleInterface = require('../../src/utils/console/consoleInterface');

module.exports = (executor) => {
    const workingDirectory = process.cwd();

    executor(workingDirectory).catch(err => {
        consoleInterface.printLine(err.toString());
        process.exit(1);
    });
}
