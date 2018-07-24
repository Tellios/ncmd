import { commandBase } from '../base';
import {
    yargsWrapper,
    selectItems,
    ConsoleInterface,
    Type
} from '../../src/utils';
import {
    getProcesses,
    removeProcess,
    processStatusColoring
} from '../../src/docker';

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
    }).argv;

commandBase(async () => {
    const processes = await getProcesses(args.running);

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

    const selectedIndexes = await selectItems(
        rows,
        'Select containers to remove'
    );

    const processesToRemove = selectedIndexes.map(index => processes[index]);

    for (const process of processesToRemove) {
        await removeProcess(args.force, process.containerId);
    }
});
