'use strict';

import { commandBase } from '../base/commandBase';
import {
    yargsWrapper,
    selectItem,
    ConsoleInterface,
    Type
} from '../../src/utils/console';
import * as chalk from 'chalk';
import { getProcesses } from '../../src/docker/getProcesses';
import { startProcess } from '../../src/docker/startProcess';
import { processStatusColoring } from '../../src/docker/utils/processStatusColoring';

const args = yargsWrapper().argv;

commandBase(() =>
    getProcesses().then(processes => {
        processes = processes.filter(
            process =>
                !(
                    process.properties.State.Running ||
                    process.properties.State.Restarting ||
                    process.properties.State.Paused
                )
        );

        if (processes.length === 0) {
            ConsoleInterface.printLine(
                'No stopped containers found',
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

        const selectedItem = selectItem(rows, 'Select container to start');
        const processToStart = processes[selectedItem];

        return startProcess(processToStart.containerId);
    })
);
