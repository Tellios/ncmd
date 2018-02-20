'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const selectBranch = require('../../src/git/selectBranch');
const localizeBranchName = require('../../src/git/utils/localizeBranchName');
const checkout = require('../../src/git/checkout');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('branch', {
        alias: 'b',
        describe: 'Specifies the branch to switch to',
        type: 'string'
    })
    .option('remote', {
        alias: 'r',
        describe: 'Include remote branches when selecting branches',
        type: 'boolean'
    })
    .argv;

function getBranchToSwitchTo(workingDirectory) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(workingDirectory, args.remote)
        .then(branch => {
            return localizeBranchName(branch.name);
        });
}

commandBase((workingDirectory) => {
    return getBranchToSwitchTo(workingDirectory)
        .then(branch => {
            return checkout(branch);
        });
});
