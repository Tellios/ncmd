'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = (processId) => {
    return cmd('docker', ['start', processId]);
}
