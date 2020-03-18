import { runCmdInConsole } from '../../common';
import { setUpstream } from './setUpstream';

export const createBranch = (
  branchName: string,
  pushToRemote: boolean,
  useNoVerify: boolean
): Promise<void> => {
  return runCmdInConsole('git', ['checkout', '-b', branchName]).then(() => {
    if (pushToRemote) {
      return setUpstream(branchName, useNoVerify);
    }

    return Promise.resolve();
  });
};
