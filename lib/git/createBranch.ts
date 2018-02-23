'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper } from '../../src/utils/console';
import { createBranch } from '../../src/git/createBranch';

const args = yargsWrapper()
    .option('branch', {
        alias: 'b',
        describe: 'Branch name',
        type: 'string',
        demandOption: true
    })
    .option('push', {
        alias: 'p',
        describe: 'If the branch should be pushed to the remote',
        type: 'boolean'
    }).argv;

commandBase(workingDirectory => createBranch(args.branch, args.push));
