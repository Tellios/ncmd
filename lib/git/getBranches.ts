'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper } from '../../src/utils/console/yargsWrapper';
import { branchNameColoring } from '../../src/git/utils/branchNameColoring';
import { getBranches } from '../../src/git/getBranches';
import { ConsoleInterface } from '../../src/utils/console/consoleInterface';

const args = yargsWrapper()
    .option('remote', {
        alias: 'r',
        describe: 'Include remote branches',
        type: 'boolean'
    })
    .argv;

commandBase((workingDirectory) =>
    getBranches(workingDirectory, args.remote)
        .then(branches => {
            ConsoleInterface.printLines(branchNameColoring(branches));
        })
);
