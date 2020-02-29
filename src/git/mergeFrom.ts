import { yargsWrapper, commandBase } from '../common';
import { selectBranch, merge } from './utils';

const args = yargsWrapper()
  .option('branch', {
    alias: 'b',
    describe: 'Specifies the branch to merge from',
    type: 'string'
  })
  .option('filter', {
    alias: 'f',
    describe: 'Optional filter if no branch is specified',
    type: 'string'
  }).argv;

function getBranchToMergeFrom(workingDirectory: string) {
  if (args.branch && args.branch.length > 0) {
    return Promise.resolve(args.branch);
  }

  return selectBranch(
    workingDirectory,
    false,
    'Select branch to merge FROM',
    args.filter
  ).then(branch => {
    return branch.name;
  });
}

commandBase(async workingDirectory => {
  const branch = await getBranchToMergeFrom(workingDirectory);
  await merge(branch);
});
