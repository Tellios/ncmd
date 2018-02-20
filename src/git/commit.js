'use strict';

const cmd = require('../utils/console/runCmdInConsole');
const push = require('./push');

/*
 * Since it is a bunch of code that is required to create a commit using
 * nodegit I just use git cli instead. Git cli will take the necessary
 * steps needed to select proper configurations and such.
 */
module.exports = (message, pushCommit) => {
    return cmd('git', ['commit', '-m', message])
        .then(() => {
            if (pushCommit) {
                return push();
            }

            return Promise.resolve();
        }).catch(() => {
            throw new Error('Commit action failed');
        });
}
