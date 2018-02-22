'use strict';

import { commandBase } from '../base/commandBase';
import { getCurrentBranch } from '../../src/git/getCurrentBranch';
import { ConsoleInterface, Type } from '../../src/utils/console/consoleInterface';
import { IBranch } from '../../src/git/utils/parseBranch';

commandBase(workingDirectory =>
    getCurrentBranch(workingDirectory)
        .then((branch: IBranch | undefined) => {
            if (branch) {
                ConsoleInterface.printLine(branch.name);
            } else {
                ConsoleInterface.printLine('Unable to determine current branch from working directory', Type.error);
            }
        })
);
