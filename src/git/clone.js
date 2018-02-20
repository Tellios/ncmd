'use strict';

const os = require('os');
const path = require('path');
const Git = require('nodegit');
const cmd = require('../utils/console/runCmdInConsole');

function getDirectoryNameFromUrl(url) {
    return url.substr(url.lastIndexOf('/') + 1);
}

module.exports = (cloneUrl, directoryName) => {
    if (!directoryName || directoryName.length === 0) {
        directoryName = getDirectoryNameFromUrl(cloneUrl);
    }

    return cmd('git', ['clone', cloneUrl, directoryName]);
}
