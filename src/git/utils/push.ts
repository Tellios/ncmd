import { runCmdInConsole, CmdError, confirm } from '../../common';
import { getCurrentBranch } from './getCurrentBranch';
import { setUpstream } from './setUpstream';

export async function push(workingDirectory: string): Promise<void> {
  try {
    await runCmdInConsole('git', ['push']);
  } catch (error) {
    if (error instanceof CmdError) {
      if (error.exitCode === 128) {
        if (
          await confirm(
            'Push failed, upstream may be missing, do you want to set it?'
          )
        ) {
          const currentBranch = await getCurrentBranch(workingDirectory);

          return await setUpstream(currentBranch.name);
        } else {
          return;
        }
      } else {
        throw new Error(error.processMessage);
      }
    }

    throw error;
  }
}
