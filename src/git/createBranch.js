'use strict';

const cmd = require('../utils/console/runCmdInConsole');
const setUpstream = require('./setUpstream');

module.exports = (branchName, pushToRemote) => {
    return cmd('git', ['checkout', '-b', branchName])
        .then(() => {
            if (pushToRemote) {
                return setUpstream(branchName);
            }

            return Promise.resolve();
        });
}
