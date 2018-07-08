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

async function getGitStatus(repository: Git.Repository): Promise<IGitStatus> {
    const statuses = await repository.getStatusExt();
    return {
        hasChanges: statuses.length > 0,
        newFiles: getChanges(statuses, change => change.isNew()),
        changedFiles: getChanges(statuses, change => change.isModified()),
        deletedFiles: getChanges(statuses, change => change.isDeleted())
    };
}

export async function getStatus(repositoryPath: string): Promise<IGitStatus> {
    const repository = await Git.Repository.open(repositoryPath);
    return await getGitStatus(repository);
}
