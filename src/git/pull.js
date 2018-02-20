'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = () => {
    return cmd('git', ['pull']);
}
