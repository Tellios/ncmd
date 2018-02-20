'use strict';

const localBranchPrefix = 'refs/heads/';
const remoteBranchPrefix = 'refs/remotes/';

module.exports = (branchReference) => {
    let branchName = branchReference.name();

    const isLocal = branchName.startsWith(localBranchPrefix);
    const isRemote = branchName.startsWith(remoteBranchPrefix);

    if (isLocal) {
        branchName = branchName.substring(localBranchPrefix.length);
    } else if (isRemote) {
        branchName = branchName.substring(5);
    }

    return {
        name: branchName,
        isRemote: isRemote,
        // Since the API actually returns numbers we use '==' instead of '==='
        isCurrent: branchReference.isHead() == true
    }
}
