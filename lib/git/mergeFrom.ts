'use strict';

import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import { selectBranch, merge } from '../../src/git';

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

commandBase(async workingDirectory => {
    const branch = await getBranchToMergeFrom(workingDirectory);
    await merge(branch);
});
