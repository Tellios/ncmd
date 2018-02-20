'use strict';

const commandBase = require('../base/commandBase');
const yargsWrapper = require('../../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const getProcesses = require('../../src/docker/getProcesses');
const processStatusColoring = require('../../src/docker/utils/processStatusColoring');
const consoleInterface = require('../../src/utils/console/consoleInterface');

const args = yargsWrapper()
    .option('running', {
        alias: 'r',
        describe: 'Only display running containers',
        type: 'boolean'
    })
    .option('raw', {
        describe: 'No coloring or styles applied to output',
        type: 'boolean'
    })
    .argv;

commandBase(() =>
    getProcesses()
        .then((processes) => {
            const rows = processes.map(process => {
                const color = processStatusColoring(process);

                let row = [
                    process.names,
                    process.image,
                    process.status,
                    process.ports,
                    process.containerId
                ];

                if (args.raw === true) {
                    return row.join('   ');
                } else {
                    return row.map(text => color(text));
                }
            });

            if (args.raw === true) {
                consoleInterface.printLines(rows);
            } else {
                consoleInterface.printTable([
                    'Name',
                    'Image',
                    'Status',
                    'Ports',
                    'Container Id'
                ], rows);
            }
        })
);