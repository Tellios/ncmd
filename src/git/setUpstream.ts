'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const setUpstream = (branchName: string): Promise<void> => {
    return runCmdInConsole('git', ['push', '--set-upstream', 'origin', branchName]);
}
