'use strict';

import * as Git from 'nodegit';

export interface IGitStatus {
    hasChanges: boolean;
    newFiles: string[];
    changedFiles: string[];
    deletedFiles: string[];
}

function getChanges(
    statuses: Git.StatusFile[],
    filterFunc: (change: Git.StatusFile) => boolean
): string[] {
    return statuses
        .filter(filterFunc)
        .map((status: Git.StatusFile) => status.path());
}

function getGitStatus(repository: Git.Repository): Promise<IGitStatus> {
    return repository.getStatusExt().then(statuses => {
        return {
            hasChanges: statuses.length > 0,
            newFiles: getChanges(statuses, change => change.isNew()),
            changedFiles: getChanges(statuses, change => change.isModified()),
            deletedFiles: getChanges(statuses, change => change.isDeleted())
        };
    });
}

export const getStatus = (repositoryPath: string): Promise<IGitStatus> => {
    return Git.Repository.open(repositoryPath).then(getGitStatus);
};
