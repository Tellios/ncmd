import { commandBase } from '../base';
import { yargsWrapper } from '../../src/utils';
import {
    getProcesses,
    IDockerContainer,
    IDockerContainerState
} from '../../src/docker';
import * as ervy from 'ervy';

const args = yargsWrapper().argv;

function getStatusCount(
    containers: IDockerContainer[],
    statusFunc: (container: IDockerContainerState) => boolean
) {
    return containers.filter(c => statusFunc(c.properties.State)).length;
}

commandBase(async () => {
    const processes = await getProcesses(false);

    const statusTotals = [
        {
            key: 'Running',
            value: getStatusCount(processes, state => state.Running),
            style: ervy.bg('green', undefined)
        },
        {
            key: 'Paused',
            value: getStatusCount(processes, state => state.Paused),
            style: ervy.bg('cyan', undefined)
        },
        {
            key: 'Exited',
            value: getStatusCount(
                processes,
                state => state.Status === 'exited'
            ),
            style: ervy.bg('blue', undefined)
        },
        {
            key: 'Error',
            value: getStatusCount(
                processes,
                state => state.OOMKilled || state.ExitCode > 0
            ),
            style: ervy.bg('red', undefined)
        },
        {
            key: 'Dead',
            value: getStatusCount(processes, state => state.Dead),
            style: ervy.bg('yellow', undefined)
        }
    ].filter(totals => totals.value > 0);

    if (statusTotals.length === 0) {
        return console.log('No containers available to display');
    }

    console.log(ervy.bar(statusTotals, { padding: 8 }));
});
