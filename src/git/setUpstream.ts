import { commandBase, yargsWrapper } from '../common';
import { getCurrentBranch, localizeBranchName, setUpstream } from './utils';

const args = yargsWrapper().option('noVerify', {
  alias: 'n',
  describe: 'Add --no-verify to git push command',
  type: 'boolean',
  default: false
}).argv;

commandBase(async ({ workingDirectory }) => {
  const branch = await getCurrentBranch(workingDirectory);
  await setUpstream(localizeBranchName(branch.name), args.noVerify);
});
