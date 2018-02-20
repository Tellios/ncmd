'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const selectBranch = require('../../src/git/selectBranch');
const localizeBranchName = require('../../src/git/utils/localizeBranchName');
const getCurrentBranch = require('../../src/git/getCurrentBranch');
const deleteBranch = require('../../src/git/deleteBranch');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('branch', {
        alias: 'b',
        describe: 'Specifies the branch to delete',
        type: 'string'
    })
    .option('push', {
        alias: 'p',
        describe: 'If the delete should be pushed (delete branch on remote)',
        type: 'boolean'
    })
    .argv;

function getBranchToDelete(workingDirectory) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(workingDirectory, args.remote, 'Select branch to DELETE')
        .then(branch => {
            return localizeBranchName(branch.name);
        });
}

commandBase((workingDirectory) => {
    return getBranchToDelete(workingDirectory)
        .then(branch => {
            return getCurrentBranch(workingDirectory)
                .then((currentBranch) => {
                    if (branch === localizeBranchName(currentBranch.name)) {
                        throw new Error('Can\'t delete the current branch, you need to switch branch first');
                    }

                    return deleteBranch(branch, args.push);
                });
        });
});
