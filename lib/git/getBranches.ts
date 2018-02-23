'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper, ConsoleInterface } from '../../src/utils/console';
import { branchNameColoring } from '../../src/git/utils/branchNameColoring';
import { getBranches } from '../../src/git/getBranches';

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
