'use strict';

const getBranches = require('./getBranches');
const branchNameColoring = require('./utils/branchNameColoring');
const selectItem = require('../utils/console/selectItem');

module.exports = (workingDirectory, includeRemote, message = 'Select branch') => {
    return getBranches(workingDirectory, includeRemote)
        .then(branches => {
            branches = branches.filter(branch => !branch.isCurrent);
            
            const itemIndex = selectItem(branchNameColoring(branches), message)
            
            return branches[itemIndex];
        });
}
