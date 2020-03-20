import { runCmdInConsole } from '../../common';

export const deleteBranch = (
  branchName: string,
  alsoDeleteRemote = false
): Promise<void> => {
  return runCmdInConsole('git', ['branch', '-d', branchName]).then(() => {
    if (alsoDeleteRemote) {
      return runCmdInConsole('git', ['push', 'origin', '--delete', branchName]);
    }

    return Promise.resolve();
  });
};
