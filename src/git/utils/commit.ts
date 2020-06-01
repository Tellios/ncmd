import { runCmdInConsole } from '../../common';
import { push } from './push';
import { appendNoVerifyIfEnabled } from './appendNoVerifyIfEnabled';

/*
 * Since it is a bunch of code that is required to create a commit using
 * nodegit I just use git cli instead. Git cli will take the necessary
 * steps needed to select proper configurations and such.
 */
export const commit = (
  workingDirectory: string,
  message: string,
  pushCommit: boolean,
  useNoVerify: boolean,
  alsoPushTags: boolean
): Promise<void> => {
  let commitArgs = ['commit', '-m', message];
  commitArgs = appendNoVerifyIfEnabled(useNoVerify, commitArgs);

  return runCmdInConsole('git', commitArgs)
    .then(() => {
      if (pushCommit) {
        return push(workingDirectory, useNoVerify, alsoPushTags);
      }

      return Promise.resolve();
    })
    .catch(() => {
      throw new Error('Commit action failed');
    });
};
