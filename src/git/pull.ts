'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const pull = (): Promise<void> => {
    return runCmdInConsole('git', ['pull']);
}
