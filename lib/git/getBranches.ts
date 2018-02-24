'use strict';

import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import { branchNameColoring, getBranches } from '../../src/git';

const args = yargsWrapper().option('remote', {
    alias: 'r',
    describe: 'Include remote branches',
    type: 'boolean'
}).argv;

commandBase(workingDirectory =>
    getBranches(workingDirectory, args.remote).then(branches => {
        ConsoleInterface.printLines(branchNameColoring(branches));
    })
);
