import {
    yargsWrapper,
    selectItems,
    ConsoleInterface,
    Type,
    commandBase
} from '../common';
import { getProcesses, startProcess, containerStatusColoring } from './utils';

const args = yargsWrapper().argv;

commandBase(async () => {
    let processes = await getProcesses();
    processes = processes.filter(
        process =>
            !(
                process.properties.State.Running ||
                process.properties.State.Restarting ||
                process.properties.State.Paused
            )
    );

    if (processes.length === 0) {
        ConsoleInterface.printLine('No stopped containers found', Type.warn);
        return;
    }

    const rows = processes.map(process => {
        const color = containerStatusColoring(process);

        let row = [
            process.names,
            process.image,
            process.status,
            process.containerId
        ].join(' - ');

        return color(row);
    });

    const selectedIndexes = await selectItems(
        rows,
        'Select container to start'
    );

    const processesToStart = selectedIndexes.map(index => processes[index]);

    for (const process of processesToStart) {
        await startProcess(process.containerId);
    }
});
