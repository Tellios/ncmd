import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import {
    getCurrentBranch,
    selectBranch,
    checkout,
    merge,
    localizeBranchName
} from '../../src/git';

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

commandBase(async (workingDirectory: string) => {
    const [sourceBranch, targetBranch] = await Promise.all([
        getCurrentBranch(workingDirectory),
        getBranchToMergeTo(workingDirectory)
    ]);

    await checkout(localizeBranchName(targetBranch));
    await merge(localizeBranchName(sourceBranch.name));
});
