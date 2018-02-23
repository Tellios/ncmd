import { positionalArgsRegexProvider } from './positionalArgsRegexProvider';
import chalk from 'chalk';

export const colorizeCommand = (commandText: string) => {
    const cmdSplit = commandText.split(' ');

    return cmdSplit
        .map((cmdPart, index) => {
            if (index === 0) {
                return chalk.greenBright(cmdPart);
            } else if (positionalArgsRegexProvider().test(cmdPart)) {
                return chalk.yellow(cmdPart);
            } else {
                return cmdPart;
            }
        })
        .join(' ');
};
