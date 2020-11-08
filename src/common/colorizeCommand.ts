import { EOL } from 'os';
import { positionalArgsRegexProvider } from './positionalArgsRegexProvider';
import { namedArgsRegexProvider } from './namedArgsRegexProvider';
import { dashArgsRegexProvider } from './dashArgsRegexProvider';
import * as chalk from 'chalk';

const controlOperators = ['&&', '||'];

export const colorizeCommand = (commandText: string): string => {
  const cmdSplit = commandText.split(' ');

  return cmdSplit
    .map((cmdPart, index) => {
      const previousPart = cmdSplit[index - 1];

      if (index === 0 || controlOperators.includes(previousPart)) {
        return chalk.greenBright(cmdPart);
      } else if (cmdPart.indexOf('${cwd}') !== -1) {
        return chalk.blue(cmdPart);
      } else if (positionalArgsRegexProvider().test(cmdPart)) {
        return chalk.yellow(cmdPart);
      } else if (namedArgsRegexProvider().test(cmdPart)) {
        return chalk.yellow(cmdPart);
      } else if (dashArgsRegexProvider().test(cmdPart)) {
        return chalk.blue(cmdPart);
      } else if (controlOperators.includes(cmdPart)) {
        return `${EOL}${chalk.cyanBright(cmdPart)}`;
      } else {
        return cmdPart;
      }
    })
    .join(' ');
};
