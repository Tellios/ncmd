'use strict';

const commandBase = require('../base/commandBase');
const getCurrentBranch = require('../../src/git/getCurrentBranch');
const consoleInterface = require('../../src/utils/console/consoleInterface');

commandBase(workingDirectory => 
    getCurrentBranch(workingDirectory)
        .then(branch => {
            consoleInterface.printLine(branch.name);
        })
);
