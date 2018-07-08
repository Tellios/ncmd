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

commandBase(async workingDirectory => {
    const status = await getStatus(workingDirectory);

    if (status.hasChanges) {
        await addAll(workingDirectory);
        await commit(workingDirectory, args.message, args.push);
    } else {
        throw new Error('Nothing to commit');
    }
});
