'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const checkout = (reference: string): Promise<void> => {
    return runCmdInConsole('git', ['checkout', reference]);
};
