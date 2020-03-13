import { runCmdInConsole } from '../../common';

export async function setUpstream(branchName: string): Promise<void> {
  await runCmdInConsole('git', [
    'push',
    '--set-upstream',
    'origin',
    branchName
  ]);
}