'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const push = (): Promise<void> => {
    return runCmdInConsole('git', ['push']);
};
