'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper, ConsoleInterface } from '../../src/utils/console';
import { selectBranch } from '../../src/git/selectBranch';
import { merge } from '../../src/git/merge';

const args = yargsWrapper().option('branch', {
    alias: 'b',
    describe: 'Specifies the branch to merge from',
    type: 'string'
}).argv;

function getBranchToMergeFrom(workingDirectory: string) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(
        workingDirectory,
        false,
        'Select branch to merge FROM'
    ).then(branch => {
        return branch.name;
    });
}

commandBase(workingDirectory =>
    getBranchToMergeFrom(workingDirectory).then(branch => {
        return merge(branch);
    })
);
