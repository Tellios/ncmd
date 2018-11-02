import { getBranches } from './getBranches';
import { branchNameColoring } from './utils/branchNameColoring';
import { selectItem } from '../utils/console/selectItem';
import { IBranch } from './utils';

export async function selectBranch(
    workingDirectory: string,
    includeRemote: boolean,
    message = 'Select branch'
): Promise<IBranch> {
    let branches = await getBranches(workingDirectory, includeRemote);
    branches = branches.filter(branch => !branch.isCurrent);

    const itemIndex = await selectItem(branchNameColoring(branches), message);

    return branches[itemIndex];
}
