'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const getStatus = require('../../src/git/getStatus');
const addAll = require('../../src/git/addAll');
const commit = require('../../src/git/commit');
const consoleInterface = require('../../src/utils/console/consoleInterface');

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
    })
    .argv;

commandBase((workingDirectory) =>
    getStatus(workingDirectory)
        .then(status => {
            if (status.hasChanges) {
                return addAll(workingDirectory)
                    .then(() => {
                        return commit(args.message, args.push);

                    });
            } else {
                throw new Error('Nothing to commit');
            }
        })
);
