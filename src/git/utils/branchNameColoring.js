'use strict';

const chalk = require('chalk');

module.exports = (branches) => {
    return branches.map(branch => {
        if (branch.isCurrent === true) {
            return chalk.green(branch.name);
        } else if (branch.isRemote === false) {
            return chalk.blue(branch.name);
        } else {
            return chalk.cyan(branch.name);
        }
    });
}
