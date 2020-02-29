import { selectItem } from '../../common';
import { getBranches } from './getBranches';
import { IBranch } from './IBranch';
import { filterBranches } from './filterBranches';
import { branchNameColoring } from './branchNameColoring';

export async function selectBranch(
  workingDirectory: string,
  includeRemote: boolean,
  message = 'Select branch',
  filter?: string | null
): Promise<IBranch> {
  let branches = await getBranches(workingDirectory, includeRemote);
  branches = branches.filter(branch => !branch.isCurrent);
  branches = filterBranches(branches, filter);

  const itemIndex = await selectItem(branchNameColoring(branches), message);

  return branches[itemIndex];
}
