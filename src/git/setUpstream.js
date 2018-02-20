'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = (branchName) => {
    return cmd('git', ['push', '--set-upstream', 'origin', branchName]);
}
