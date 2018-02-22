'use strict';

import { commandBase } from '../base/commandBase';
import { getCurrentBranch } from '../../src/git/getCurrentBranch';
import { localizeBranchName } from '../../src/git/utils/localizeBranchName';
import { setUpstream } from '../../src/git/setUpstream';

commandBase((workingDirectory) =>
    getCurrentBranch(workingDirectory)
        .then(branch =>
            setUpstream(
                localizeBranchName(branch.name)))
);
