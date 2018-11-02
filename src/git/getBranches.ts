import { parseBranches, IBranch, sortBranches } from './utils';
import { getCmdResult } from '../utils';

export const getBranches = (
    repositoryPath: string,
    includeRemote: boolean
): Promise<IBranch[]> => {
    const gitArgs = ['branch', '--list', '--no-color'];

    if (includeRemote) {
        gitArgs.push('-a');
    }

    return getCmdResult('git', gitArgs, repositoryPath)
        .then(parseBranches)
        .then(sortBranches);
};
