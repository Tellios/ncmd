import { getCmdResult } from '../../common';
import { IBranch } from './IBranch';
import { parseBranches } from './parseBranches';
import { sortBranches } from './sortBranches';
import { filterBranches } from './filterBranches';

export const getBranches = (
  repositoryPath: string,
  includeRemote: boolean,
  filter?: string
): Promise<IBranch[]> => {
  const gitArgs = ['branch', '--list', '--no-color'];

  if (includeRemote) {
    gitArgs.push('-a');
  }

  return getCmdResult('git', gitArgs, repositoryPath)
    .then(parseBranches)
    .then(sortBranches)
    .then((branches) => filterBranches(branches, filter));
};
