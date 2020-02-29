import { runCmdInConsole } from '../../common';

export const startProcess = (processId: string): Promise<void> => {
    return runCmdInConsole('docker', ['start', processId]);
};
