'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const getStatus = require('../../src/git/getStatus');
const consoleInterface = require('../../src/utils/console/consoleInterface');

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
    })
    .argv;

function getOrIgnore(ignore, files) {
    if (ignore) {
        return [];
    }

    return files;
}

function getStatusOutput(status) {
    return [
        ...getOrIgnore(args.modified || args.deleted, status.newFiles.map(file => chalk.green(`+ ${file}`))),
        ...getOrIgnore(args.new || args.deleted, status.changedFiles.map(file => chalk.yellow(`M ${file}`))),
        ...getOrIgnore(args.new || args.modified, status.deletedFiles.map(file => chalk.red(`- ${file}`)))
    ]
}

commandBase((workingDirectory) =>
    getStatus(workingDirectory)
        .then(status => {
            if (status.hasChanges) {
                consoleInterface.printLines(getStatusOutput(status));
            } else {
                consoleInterface.printLine('Nothing to commit');
            }
        })
);
