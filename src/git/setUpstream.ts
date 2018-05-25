'use strict';

import { runCmdInConsole } from '../utils/console/runCmdInConsole';

export async function setUpstream(branchName: string): Promise<void> {
    await runCmdInConsole('git', [
        'push',
        '--set-upstream',
        'origin',
        branchName
    ]);
}
