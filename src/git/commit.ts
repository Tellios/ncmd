'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';
import { push } from './push';

/*
 * Since it is a bunch of code that is required to create a commit using
 * nodegit I just use git cli instead. Git cli will take the necessary
 * steps needed to select proper configurations and such.
 */
export const commit = (message: string, pushCommit: boolean): Promise<void> => {
    return runCmdInConsole('git', ['commit', '-m', message])
        .then(() => {
            if (pushCommit) {
                return push();
            }

            return Promise.resolve();
        })
        .catch(() => {
            throw new Error('Commit action failed');
        });
};
