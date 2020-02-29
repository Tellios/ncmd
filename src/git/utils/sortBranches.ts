import { IBranch } from './IBranch';

export function sortBranches(branches: IBranch[]): IBranch[] {
  return branches.sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) {
      return -1;
    }

    if (a.isRemote && !b.isRemote) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });
}
