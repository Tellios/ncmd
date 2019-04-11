import { getBranches } from './getBranches';
import { branchNameColoring } from './utils/branchNameColoring';
import { selectItem } from '../utils/console/selectItem';
import { IBranch, filterBranches } from './utils';

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
