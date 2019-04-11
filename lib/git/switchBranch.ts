import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import { selectBranch, localizeBranchName, checkout } from '../../src/git';

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
    .option('filter', {
        alias: 'f',
        describe: 'Branch name filter',
        type: 'string'
    }).argv;

function getBranchToSwitchTo(workingDirectory: string) {
    if (args.branch && args.branch.length > 0) {
        return Promise.resolve(args.branch);
    }

    return selectBranch(
        workingDirectory,
        args.remote,
        'Select branch to switch to',
        args.filter
    ).then(branch => {
        return localizeBranchName(branch.name);
    });
}

commandBase(async workingDirectory => {
    const branch = await getBranchToSwitchTo(workingDirectory);
    return await checkout(branch);
});
