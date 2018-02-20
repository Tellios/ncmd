'use strict';

const getBranches = require('./getBranches');

module.exports = (workingDirectory) => {
    return getBranches(workingDirectory, true).then(branches => {
        return branches.find(branch => {
            return branch.isCurrent;
        })
    })
}