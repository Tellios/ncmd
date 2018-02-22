'use strict';

import * as process from 'process';
import { ConsoleInterface } from '../../src/utils/console/consoleInterface';

export const commandBase = (executor: (workingDirectory: string) => Promise<void>) => {
    const workingDirectory = process.cwd();

    executor(workingDirectory).catch(err => {
        ConsoleInterface.printLine(err.toString());
        process.exit(1);
    });
}
