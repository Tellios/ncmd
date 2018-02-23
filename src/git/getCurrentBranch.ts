'use strict';

import * as Git from 'nodegit';
import { getBranches } from './getBranches';
import { IBranch } from './utils/parseBranch';

export const getCurrentBranch = (
    workingDirectory: string
): Promise<IBranch> => {
    return getBranches(workingDirectory, true).then(branches => {
        const currentBranch = branches.find(branch => {
            return branch.isCurrent;
        });

        if (!currentBranch) {
            throw new Error(
                'Unable to determine current branch from working directory'
            );
        }

        return currentBranch;
    });
};
