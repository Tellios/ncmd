'use strict';

import * as process from 'process';
import { ConsoleInterface, CmdError } from '../../src/utils/console';

export function commandBase(
    executor: (workingDirectory: string) => Promise<void>
) {
    const workingDirectory = process.cwd();

    executor(workingDirectory).catch(err => {
        if (err instanceof CmdError) {
            ConsoleInterface.printLine(err.processMessage);
        } else {
            ConsoleInterface.printLine(err.toString());
        }

        process.exit(1);
    });
}
