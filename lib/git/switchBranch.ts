'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper, ConsoleInterface } from '../../src/utils/console';
import { selectBranch } from '../../src/git/selectBranch';
import { localizeBranchName } from '../../src/git/utils/localizeBranchName';
import { checkout } from '../../src/git/checkout';

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
    }).argv;

function getBranchToSwitchTo(workingDirectory: string) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(workingDirectory, args.remote).then(branch => {
        return localizeBranchName(branch.name);
    });
}

commandBase(workingDirectory => {
    return getBranchToSwitchTo(workingDirectory).then(branch => {
        return checkout(branch);
    });
});
