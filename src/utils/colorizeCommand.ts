import { positionalArgsRegexProvider } from './positionalArgsRegexProvider';
import { namedArgsRegexProvider } from './namedArgsRegexProvider';
import { dashArgsRegexProvider } from './dashArgsRegexProvider';
import chalk from 'chalk';

export const colorizeCommand = (commandText: string) => {
    const cmdSplit = commandText.split(' ');

    return cmdSplit
        .map((cmdPart, index) => {
            if (index === 0) {
                return chalk.greenBright(cmdPart);
            } else if (cmdPart.indexOf('${cwd}') !== -1) {
                return chalk.blue(cmdPart);
            } else if (positionalArgsRegexProvider().test(cmdPart)) {
                return chalk.yellow(cmdPart);
            } else if (namedArgsRegexProvider().test(cmdPart)) {
                return chalk.yellow(cmdPart);
            } else if (dashArgsRegexProvider().test(cmdPart)) {
                return chalk.blue(cmdPart);
            } else if (cmdPart === '&&' || cmdPart === '||') {
                return chalk.cyanBright(cmdPart);
            } else {
                return cmdPart;
            }
        })
        .join(' ');
};
