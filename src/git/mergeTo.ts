import { yargsWrapper, commandBase } from '../common';
import {
    getCurrentBranch,
    selectBranch,
    checkout,
    merge,
    localizeBranchName
} from './utils';

const args = yargsWrapper()
    .option('branch', {
        alias: 'b',
        describe: 'Specifies the branch to merge to',
        type: 'string'
    })
    .option('filter', {
        alias: 'f',
        describe: 'Optional filter if no branch is specified',
        type: 'string'
    }).argv;

function getBranchToMergeTo(workingDirectory: string) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(
        workingDirectory,
        false,
        'Select branch to merge TO',
        args.filter
    ).then(branch => {
        return branch.name;
    });
}

commandBase(async (workingDirectory: string) => {
    const [sourceBranch, targetBranch] = await Promise.all([
        getCurrentBranch(workingDirectory),
        getBranchToMergeTo(workingDirectory)
    ]);

    await checkout(localizeBranchName(targetBranch));
    await merge(localizeBranchName(sourceBranch.name));
});
