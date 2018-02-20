'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = (branchName, alsoDeleteRemote = false) => {
    return cmd('git', ['branch', '-d', branchName])
        .then(() => {
            if (alsoDeleteRemote) {
                return cmd('git', ['push', 'origin', '--delete', branchName]);
            }

            return Promise.resolve();
        });
}
