'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper, selectItem, ConsoleInterface, Type } from '../../src/utils/console';
import * as chalk from 'chalk';
import { getProcesses } from '../../src/docker/getProcesses';
import { removeProcess } from '../../src/docker/removeProcess';
import { processStatusColoring } from '../../src/docker/utils/processStatusColoring';

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
                ConsoleInterface.printLine('No containers found', Type.warn);
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