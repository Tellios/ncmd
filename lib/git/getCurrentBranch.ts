'use strict';

import { commandBase } from '../base';
import { getCurrentBranch, IBranch } from '../../src/git';
import { ConsoleInterface, Type } from '../../src/utils';

commandBase(async workingDirectory => {
    const branch = await getCurrentBranch(workingDirectory);

    if (branch) {
        ConsoleInterface.printLine(branch.name);
    } else {
        ConsoleInterface.printLine(
            'Unable to determine current branch from working directory',
            Type.error
        );
    }
});
