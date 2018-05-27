'use strict';

import { commandBase } from '../base';
import {
    getCurrentBranch,
    localizeBranchName,
    setUpstream
} from '../../src/git';

commandBase(async workingDirectory => {
    const branch = await getCurrentBranch(workingDirectory);
    await setUpstream(localizeBranchName(branch.name));
});
