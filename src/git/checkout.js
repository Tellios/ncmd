'use strict';

const cmd = require('../utils/console/runCmdInConsole');

module.exports = (reference) => {
    return cmd('git', ['checkout', reference]);
}
