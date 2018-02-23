'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export const merge = (sourceBranch: string): Promise<void> => {
    return runCmdInConsole('git', ['merge', '--no-ff', sourceBranch]).catch(
        () => {
            throw new Error('Merge failed');
        }
    );
};
