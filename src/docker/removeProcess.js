'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = (force, processId) => {
    const args = ['rm'];

    if (force === true)  {
        args.push('-f');
    }

    args.push(processId);

    return cmd('docker', args);
}
