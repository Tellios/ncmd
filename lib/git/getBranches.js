'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const branchNameColoring = require('../../src/git/utils/branchNameColoring');
const getBranches = require('../../src/git/getBranches');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('remote', {
        alias: 'r',
        describe: 'Include remote branches',
        type: 'boolean'
    })
    .argv;

commandBase((workingDirectory) =>
    getBranches(workingDirectory, args.remote)
        .then(branches => {
            consoleInterface.printLines(branchNameColoring(branches));
        })
);
