'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const getProcesses = require('../../src/docker/getProcesses');
const removeProcess = require('../../src/docker/removeProcess');
const processStatusColoring = require('../../src/docker/utils/processStatusColoring');
const selectItem = require('../../src/utils/console/selectItem');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('running', {
        alias: 'r',
        describe: 'Only display running containers',
        type: 'boolean'
    })
    .option('force', {
        alias: 'f',
        describe: 'Remove container even if it is running',
        type: 'boolean'
    })
    .argv;

commandBase(() =>
    getProcesses()
        .then((processes) => {
            processes = processes.filter(process => process.properties.State.Running || !args.running);

            if (processes.length === 0) {
                consoleInterface.printLine('No containers found', consoleInterface.TYPE.warn);
                return;
            }

            const rows = processes.map(process => {
                const color = processStatusColoring(process);

                let row = [
                    process.names,
                    process.image,
                    process.status,
                    process.containerId
                ].join(' - ');

                return color(row);
            });

            const selectedItem = selectItem(rows, 'Select container to remove');
            const processToRemove = processes[selectedItem];

            return removeProcess(args.force, processToRemove.containerId);
        })
);