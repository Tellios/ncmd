'use strict';

const Git = require('nodegit');
const parseBranch = require('./utils/parseBranch');

function getAllReferences(repository) {
    return repository.getReferences(Git.Reference.TYPE.LISTALL);
}

function getBranchReferences(references, includeRemote) {
    return references.filter((reference) => {
        return reference.isBranch() === 1
            || (includeRemote && reference.isRemote() === 1);
    })
}

function parseBranches(branchReferences) {
    return branchReferences.map(reference => parseBranch(reference));
}

function sortBranches(branches) {
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

module.exports = (repositoryPath, includeRemote) => {
    return Git.Repository.open(repositoryPath)
        .then(getAllReferences)
        .then(references => getBranchReferences(references, includeRemote))
        .then(parseBranches)
        .then(sortBranches);
}
