'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const startProcess = (processId: string): Promise<void> => {
    return runCmdInConsole('docker', ['start', processId]);
};
