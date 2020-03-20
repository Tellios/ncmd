import * as chalk from 'chalk';
import { ConsoleInterface, Type, commandBase } from '../../common';
import { getAliases, getAliasHelpTableContent } from '../utils';

export const listAliases = async (): Promise<void> => {
  await commandBase(async () => {
    const aliases = await getAliases();

    aliases.forEach(alias => {
      const helpContent = getAliasHelpTableContent(alias);
      ConsoleInterface.printLine(chalk.bold(alias.name), Type.log);
      ConsoleInterface.printVerticalTable(helpContent);
    });
  });
};
