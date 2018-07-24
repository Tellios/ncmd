import { commandBase } from '../base';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import { getProcesses, processStatusColoring } from '../../src/docker';

const args = yargsWrapper().option('running', {
    alias: 'r',
    describe: 'Only display running containers',
    type: 'boolean'
}).argv;

commandBase(async () => {
    const processes = await getProcesses(args.running);

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
});
