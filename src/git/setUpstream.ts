import { commandBase } from '../common';
import { getCurrentBranch, localizeBranchName, setUpstream } from './utils';

commandBase(async workingDirectory => {
  const branch = await getCurrentBranch(workingDirectory);
  await setUpstream(localizeBranchName(branch.name));
});
