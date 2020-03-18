import { runCmdInConsole, CmdError, confirm } from '../../common';
import { getCurrentBranch } from './getCurrentBranch';
import { setUpstream } from './setUpstream';
import { appendNoVerifyIfEnabled } from './appendNoVerifyIfEnabled';

export async function push(
  workingDirectory: string,
  useNoVerify: boolean
): Promise<void> {
  try {
    let pushArgs = ['push'];
    pushArgs = appendNoVerifyIfEnabled(useNoVerify, pushArgs);

    await runCmdInConsole('git', pushArgs);
  } catch (error) {
    if (error instanceof CmdError) {
      if (error.exitCode === 128) {
        if (
          await confirm(
            'Push failed, upstream may be missing, do you want to set it?'
          )
        ) {
          const currentBranch = await getCurrentBranch(workingDirectory);

          return await setUpstream(currentBranch.name, useNoVerify);
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
