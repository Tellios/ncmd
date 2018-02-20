'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = (sourceBranch) => {
    return cmd('git', ['merge', '--no-ff', sourceBranch])
        .catch(() => {
            throw new Error('Merge failed');
        });
}
