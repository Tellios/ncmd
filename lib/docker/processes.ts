'use strict';

import { commandBase } from '../base/commandBase';
import { yargsWrapper, ConsoleInterface } from '../../src/utils/console';
import * as chalk from 'chalk';
import { getProcesses } from '../../src/docker/getProcesses';
import { processStatusColoring } from '../../src/docker/utils/processStatusColoring';

const args = yargsWrapper().option('running', {
    alias: 'r',
    describe: 'Only display running containers',
    type: 'boolean'
}).argv;

commandBase(() =>
    getProcesses().then(processes => {
        const rows: string[][] = processes.map(process => {
            const color = processStatusColoring(process);

            let row = [
                process.names,
                process.image,
                process.status,
                process.ports,
                process.containerId
            ];

            return row.map(text => color(text) as string);
        });

        ConsoleInterface.printTable(
            ['Name', 'Image', 'Status', 'Ports', 'Container Id'],
            rows
        );
    })
);
