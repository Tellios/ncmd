'use strict';

import { commandBase } from '../base';
import {
    yargsWrapper,
    selectItem,
    ConsoleInterface,
    Type
} from '../../src/utils';
import * as chalk from 'chalk';
import {
    getProcesses,
    stopProcess,
    processStatusColoring
} from '../../src/docker';

const args = yargsWrapper().argv;

commandBase(() =>
    getProcesses().then(processes => {
        processes = processes.filter(
            process =>
                process.properties.State.Running ||
                process.properties.State.Restarting ||
                process.properties.State.Paused
        );

        if (processes.length === 0) {
            ConsoleInterface.printLine(
                'No containers with the states [Running], [Restarting] or [Paused] found',
                Type.warn
            );
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

        const selectedItem = selectItem(rows, 'Select container to stop');
        const processToStop = processes[selectedItem];

        return stopProcess(processToStop.containerId);
    })
);
