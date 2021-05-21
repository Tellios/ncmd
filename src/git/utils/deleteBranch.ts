import { runCmdInConsole } from '../../common';

export const deleteBranch = (
  branchName: string,
  {
    alsoDeleteRemote = false,
    noVerify = false
  }: { alsoDeleteRemote: boolean; noVerify: boolean }
): Promise<void> => {
  return runCmdInConsole('git', ['branch', '-d', branchName]).then(() => {
    if (alsoDeleteRemote) {
      return runCmdInConsole('git', [
        'push',
        'origin',
        '--delete',
        branchName,
        noVerify ? '--no-verify' : ''
      ]);
    }

    return Promise.resolve();
  });
};
