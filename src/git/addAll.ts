import * as Git from 'nodegit';

function getChanges(
    statuses: Git.StatusFile[],
    filterFunc: (status: Git.StatusFile) => boolean
) {
    return statuses
        .filter(filterFunc)
        .map((status: Git.StatusFile) => status.path());
}

function addAllToIndex(repository: Git.Repository) {
    return repository.index().then(index => {
        return index
            .removeAll(undefined as any)
            .then(() => {
                return index.addAll(undefined as any, undefined as any);
            })
            .then(() => {
                // Sync
                return index.write();
            })
            .then(() => {
                // Oid
                return index.writeTree();
            });
    });
}

export const addAll = (repositoryPath: string) => {
    return Git.Repository.open(repositoryPath).then(addAllToIndex);
};
