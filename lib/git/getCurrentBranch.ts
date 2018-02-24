'use strict';

import { commandBase } from '../base';
import { getCurrentBranch, IBranch } from '../../src/git';
import { ConsoleInterface, Type } from '../../src/utils';

commandBase(workingDirectory =>
    getCurrentBranch(workingDirectory).then((branch: IBranch | undefined) => {
        if (branch) {
            ConsoleInterface.printLine(branch.name);
        } else {
            ConsoleInterface.printLine(
                'Unable to determine current branch from working directory',
                Type.error
            );
        }
    })
);
