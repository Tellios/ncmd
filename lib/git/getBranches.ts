'use strict';

import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import { branchNameColoring, getBranches } from '../../src/git';

const args = yargsWrapper().option('remote', {
    alias: 'r',
    describe: 'Include remote branches',
    type: 'boolean'
}).argv;

commandBase(async workingDirectory => {
    const branches = await getBranches(workingDirectory, args.remote);
    ConsoleInterface.printLines(branchNameColoring(branches));
});
