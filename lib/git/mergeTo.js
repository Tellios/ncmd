'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const getCurrentBranch = require('../../src/git/getCurrentBranch');
const selectBranch = require('../../src/git/selectBranch');
const checkout = require('../../src/git/checkout');
const merge = require('../../src/git/merge');
const localizeBranchName = require('../../src/git/utils/localizeBranchName');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('branch', {
        alias: 'b',
        describe: 'Specifies the branch to switch to',
        type: 'string'
    })
    .argv;

function getBranchToMergeTo(workingDirectory) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(workingDirectory, false, 'Select branch to merge TO')
        .then(branch => {
            return branch.name;
        });
}

commandBase(workingDirectory =>
    Promise.all([
        getCurrentBranch(workingDirectory),
        getBranchToMergeTo(workingDirectory)
    ]).then(result => {
        const [sourceBranch, targetBranch] = result;

        return checkout(localizeBranchName(targetBranch))
            .then(() => merge(localizeBranchName(sourceBranch.name)));
    })
);
