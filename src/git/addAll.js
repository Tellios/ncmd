'use strict';

const Git = require('nodegit');

function getChanges(statuses, filterFunc) {
    return statuses
        .filter(filterFunc)
        .map(status => status.path());
}

function addAll(repository) {
    return repository.index()
        .then(index => {
            return index.removeAll()
                .then(() => {
                    return index.addAll();
                })
                .then(() => {
                    // Sync
                    return index.write();
                })
                .then(() => {
                    // Oid
                    return index.writeTree();
                })
        });
}

module.exports = (repositoryPath) => {
    return Git.Repository.open(repositoryPath)
        .then(addAll);
}
