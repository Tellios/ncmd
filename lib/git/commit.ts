'use strict';

import { commandBase } from '../base';
import { yargsWrapper } from '../../src/utils';
import chalk from 'chalk';
import { getStatus, addAll, commit } from '../../src/git';

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
