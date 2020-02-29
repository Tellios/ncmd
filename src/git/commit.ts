import { yargsWrapper, commandBase } from '../common';
import { getStatus, addAll, commit } from './utils';

const args = yargsWrapper()
    .option('addAll', {
        alias: 'a',
        describe: 'Stage all git changes (git add .) before commit',
        type: 'boolean'
    })
    .option('message', {
        alias: 'm',
        describe: 'Commit message',
        type: 'string',
        demandOption: true
    })
    .option('push', {
        alias: 'p',
        describe: 'Push to remote after commiting',
        type: 'boolean',
        default: false
    }).argv;

commandBase(async workingDirectory => {
    const status = await getStatus(workingDirectory);

    if (status.hasChanges) {
        if (args.addAll) {
            await addAll(workingDirectory);
        }

        await commit(workingDirectory, args.message, args.push);
    } else {
        throw new Error('Nothing to commit');
    }
});
