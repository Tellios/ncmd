import chalk from 'chalk';
import { IBranch } from './IBranch';

export const branchNameColoring = (branches: IBranch[]): string[] => {
    return branches.map(branch => {
        if (branch.isCurrent === true) {
            return chalk.green(branch.name);
        } else if (branch.isRemote === false) {
            return chalk.blue(branch.name);
        } else {
            return chalk.cyan(branch.name);
        }
    });
};
