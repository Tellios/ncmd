import * as chalk from 'chalk';
import { commandBase } from '../../base';
import { getAliases, getAliasHelpTableContent } from '../../../src/alias';
import { ConsoleInterface, Type } from '../../../src/utils';

export const listAliases = async () => {
    await commandBase(async () => {
        const aliases = await getAliases();

        aliases.forEach(alias => {
            const helpContent = getAliasHelpTableContent(alias);
            ConsoleInterface.printLine(chalk.bold(alias.name), Type.log);
            ConsoleInterface.printVerticalTable(helpContent);
        });
    });
};
