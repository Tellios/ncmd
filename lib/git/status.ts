'use strict';

import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import chalk from 'chalk';
import { getStatus, IGitStatus } from '../../src/git';

const args = yargsWrapper()
    .option('new', {
        alias: 'n',
        describe: 'Only show new files',
        type: 'boolean'
    })
    .option('modified', {
        alias: 'm',
        describe: 'Only show modified files',
        type: 'boolean'
    })
    .option('deleted', {
        alias: 'd',
        describe: 'Only show deleted files',
        type: 'boolean'
    }).argv;

function getOrIgnore(ignore: boolean, files: string[]) {
    if (ignore) {
        return [];
    }

    return files;
}

function getStatusOutput(status: IGitStatus) {
    return [
        ...getOrIgnore(
            args.modified || args.deleted,
            status.newFiles.map((file: string) => chalk.green(`+ ${file}`))
        ),
        ...getOrIgnore(
            args.new || args.deleted,
            status.changedFiles.map((file: string) => chalk.yellow(`M ${file}`))
        ),
        ...getOrIgnore(
            args.new || args.modified,
            status.deletedFiles.map((file: string) => chalk.red(`- ${file}`))
        )
    ];
}

commandBase(async workingDirectory => {
    const status = await getStatus(workingDirectory);

    if (status.hasChanges) {
        ConsoleInterface.printLines(getStatusOutput(status));
    } else {
        ConsoleInterface.printLine('Nothing to commit');
    }
});
