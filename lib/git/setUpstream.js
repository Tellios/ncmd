'use strict';

const commandBase = require('../base/commandBase');
const getCurrentBranch = require('../../src/git/getCurrentBranch');
const localizeBranchName = require('../../src/git/utils/localizeBranchName');
const setUpstream = require('../../src/git/setUpstream');

commandBase((workingDirectory) =>
    getCurrentBranch(workingDirectory)
        .then(branch =>
            setUpstream(
                localizeBranchName(branch.name)))
);
