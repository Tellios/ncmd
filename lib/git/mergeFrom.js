'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const selectBranch = require('../../src/git/selectBranch');
const merge = require('../../src/git/merge');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('branch', {
        alias: 'b',
        describe: 'Specifies the branch to merge from',
        type: 'string'
    })
    .argv;

function getBranchToMergeFrom(workingDirectory) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(workingDirectory, false, 'Select branch to merge FROM')
        .then(branch => {
            return branch.name;
        });
}

commandBase(workingDirectory =>
    getBranchToMergeFrom(workingDirectory)
        .then(branch => {
            return merge(branch);
        })
);

