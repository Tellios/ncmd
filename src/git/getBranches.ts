'use strict';

import * as Git from 'nodegit';
import { parseBranch, IBranch } from './utils/parseBranch';

function getAllReferences(repository: Git.Repository) {
    return repository.getReferences(Git.Reference.TYPE.LISTALL);
}

function getBranchReferences(
    references: Git.Reference[],
    includeRemote: boolean
) {
    return references.filter(reference => {
        return (
            reference.isBranch() === 1 ||
            (includeRemote && reference.isRemote() === 1)
        );
    });
}

function parseBranches(branchReferences: Git.Reference[]): IBranch[] {
    return branchReferences.map(reference => parseBranch(reference));
}

function sortBranches(branches: IBranch[]): IBranch[] {
    return branches.sort((a, b) => {
        if (a.isCurrent && !b.isCurrent) {
            return -1;
        }

        if (a.isRemote && !b.isRemote) {
            return 1;
        }

        return a.name.localeCompare(b.name);
    });
}

export const getBranches = (
    repositoryPath: string,
    includeRemote: boolean
): Promise<IBranch[]> => {
    return Git.Repository.open(repositoryPath)
        .then(getAllReferences)
        .then(references => getBranchReferences(references, includeRemote))
        .then(parseBranches)
        .then(sortBranches);
};
