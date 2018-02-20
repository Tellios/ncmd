'use strict';

const Git = require('nodegit');

function getChanges(statuses, filterFunc) {
    return statuses
        .filter(filterFunc)
        .map(status => status.path());
}

function getStatus(repository) {
    return repository.getStatusExt()
        .then(statuses => {
            return {
                hasChanges: statuses.length > 0,
                newFiles: getChanges(statuses, change => change.isNew()),
                changedFiles: getChanges(statuses, change => change.isModified()),
                deletedFiles: getChanges(statuses, change => change.isDeleted())
            };
        });
}

module.exports = (repositoryPath) => {
    return Git.Repository.open(repositoryPath)
        .then(getStatus);
}
