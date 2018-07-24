import { commandBase } from '../base';
import {
    yargsWrapper,
    selectItems,
    ConsoleInterface,
    Type
} from '../../src/utils';
import {
    getProcesses,
    stopProcess,
    processStatusColoring
} from '../../src/docker';

const args = yargsWrapper().argv;

commandBase(async () => {
    let processes = await getProcesses();
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

    const selectedIndexes = await selectItems(rows, 'Select container to stop');
    const processesToStop = selectedIndexes.map(index => processes[index]);

    for (const process of processesToStop) {
        await stopProcess(process.containerId);
    }
});
