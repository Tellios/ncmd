import * as chalk from 'chalk';
import { Chalk } from 'chalk';
import { ContainerStatus } from './ContainerStatus';
import { IDockerContainer } from './IDockerContainer';

export const containerStatusColoring = (container: IDockerContainer): Chalk => {
    const state = container.properties.State;

    switch (state.Status) {
        case 'created':
            return chalk.gray;
        case 'restarting':
            return chalk.yellow;
        case 'running':
            return chalk.green;
        case 'removing':
            return chalk.red;
        case 'paused':
            return chalk.cyan;
        case 'exited':
            if (state.ExitCode === 0) {
                return chalk.blue;
            }
            return chalk.red;
        case 'dead':
            return chalk.red;
        default:
            throw new Error(`Unknown state: ${state.Status}`);
    }
};
