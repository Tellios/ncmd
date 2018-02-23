'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper, ConsoleInterface } from '../../src/utils/console';
import { getCurrentBranch } from '../../src/git/getCurrentBranch';
import { selectBranch } from '../../src/git/selectBranch';
import { checkout } from '../../src/git/checkout';
import { merge } from '../../src/git/merge';
import { localizeBranchName } from '../../src/git/utils/localizeBranchName';

const args = yargsWrapper().option('branch', {
    alias: 'b',
    describe: 'Specifies the branch to merge to',
    type: 'string'
}).argv;

function getBranchToMergeTo(workingDirectory: string) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(
        workingDirectory,
        false,
        'Select branch to merge TO'
    ).then(branch => {
        return branch.name;
    });
}

commandBase((workingDirectory: string) =>
    Promise.all([
        getCurrentBranch(workingDirectory),
        getBranchToMergeTo(workingDirectory)
    ]).then(result => {
        const [sourceBranch, targetBranch] = result;

        return checkout(localizeBranchName(targetBranch)).then(() =>
            merge(localizeBranchName(sourceBranch.name))
        );
    })
);
