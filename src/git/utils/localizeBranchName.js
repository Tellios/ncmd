'use strict';

const remoteText = 'remotes/origin/';

module.exports = (branchName) => {
    if (branchName.startsWith(remoteText)) {
        return branchName.substr(remoteText.length);
    }

    return branchName;
}
