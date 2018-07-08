import chalk from 'chalk';

export const processStatusColoring = (process: any): any => {
    const state = process.properties.State;

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
