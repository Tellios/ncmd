'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper } from '../../src/utils/console';
import chalk from 'chalk';
import { getStatus } from '../../src/git/getStatus';
import { addAll } from '../../src/git/addAll';
import { commit } from '../../src/git/commit';

const args = yargsWrapper()
    .option('message', {
        alias: 'm',
        describe: 'Commit message',
        type: 'string',
        demandOption: true
    })
    .option('push', {
        alias: 'p',
        describe: 'Push to remote after commiting',
        type: 'boolean'
    }).argv;

commandBase(workingDirectory =>
    getStatus(workingDirectory).then(status => {
        if (status.hasChanges) {
            return addAll(workingDirectory).then(() => {
                return commit(args.message, args.push);
            });
        } else {
            throw new Error('Nothing to commit');
        }
    })
);
