'use strict';

const commandBase = require('../base/commandBase');
const spawn = require('child_process').spawnSync;
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const clone = require('../../src/git/clone');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('url', {
        alias: 'u',
        describe: 'The url to the repository you want to clone',
        type: 'string',
        demand: true
    })
    .option('directory', {
        alias: 'd',
        describe: 'Optional name for the checkout directory',
        type: 'string'
    })
    .option('code', {
        alias: 'c',
        describe: 'If you want to start Visual Studio Code for the cloned repository',
        type: 'boolean'
    })
    .argv;

commandBase(() =>
    clone(args.url, args.directory)
        .then((result) => {
            consoleInterface.printLine('Repository cloned');

            return new Promise((resolve, reject) => {
                try {
                    if (args.code) {
                        spawn('code', [result.directory], {
                            detached: true,
                            stdio: 'ignore',
                            shell: true
                        });
                    }

                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        })
);