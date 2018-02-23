'use strict';

import * as Git from 'nodegit';
import { getBranches } from './getBranches';
import { branchNameColoring } from './utils/branchNameColoring';
import { selectItem } from '../utils/console/selectItem';
import { IBranch } from './utils/parseBranch';

export const selectBranch = (
    workingDirectory: string,
    includeRemote: boolean,
    message = 'Select branch'
): Promise<IBranch> => {
    return getBranches(workingDirectory, includeRemote).then(branches => {
        branches = branches.filter(branch => !branch.isCurrent);

        const itemIndex = selectItem(branchNameColoring(branches), message);

        return branches[itemIndex];
    });
};
