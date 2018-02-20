'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const getProcesses = require('../../src/docker/getProcesses');
const startProcess = require('../../src/docker/startProcess');
const processStatusColoring = require('../../src/docker/utils/processStatusColoring');
const selectItem = require('../../src/utils/console/selectItem');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .argv;

commandBase(() =>
    getProcesses()
        .then((processes) => {
            processes = processes.filter(
                process => !(process.properties.State.Running
                    || process.properties.State.Restarting
                    || process.properties.State.Paused)
            );

            if (processes.length === 0) {
                consoleInterface.printLine('No stopped containers found', consoleInterface.TYPE.warn);
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

            const selectedItem = selectItem(rows, 'Select container to start');
            const processToStart = processes[selectedItem];

            return startProcess(processToStart.containerId);
        })
);