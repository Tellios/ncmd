'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const deleteBranch = (branchName: string, alsoDeleteRemote: boolean = false): Promise<void> => {
    return runCmdInConsole('git', ['branch', '-d', branchName])
        .then(() => {
            if (alsoDeleteRemote) {
                return runCmdInConsole('git', ['push', 'origin', '--delete', branchName]);
            }

            return Promise.resolve();
        });
}
