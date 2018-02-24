'use strict';

import { commandBase } from '../base';
import {
    getCurrentBranch,
    localizeBranchName,
    setUpstream
} from '../../src/git';

commandBase(workingDirectory =>
    getCurrentBranch(workingDirectory).then(branch =>
        setUpstream(localizeBranchName(branch.name))
    )
);
