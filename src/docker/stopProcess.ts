'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const stopProcess = (processId: string): Promise<void> => {
    return runCmdInConsole('docker', ['stop', processId]);
};
