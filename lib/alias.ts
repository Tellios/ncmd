'use strict';

import * as process from 'process';
import { commandBase } from './base';
import {
    runCmdInConsole,
    yargsWrapper,
    ConsoleInterface,
    Type
} from '../src/utils';
import {
    injectArguments,
    parseCommand,
    getAliases,
    getAliasHelpTableContent
} from '../src/alias';
import chalk from 'chalk';
import * as jsYaml from 'js-yaml';
import * as fse from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

const args = process.argv.slice(2);
const printArg = '--print';

if (args.length === 0 || (args.length === 1 && args[0] === printArg)) {
    commandBase(async () => {
        const aliases = await getAliases();

        aliases.forEach(alias => {
            const helpContent = getAliasHelpTableContent(alias);
            ConsoleInterface.printLine(chalk.bold(alias.name), Type.log);
            ConsoleInterface.printVerticalTable(helpContent);
        });
    });
} else {
    commandBase(async () => {
        const aliases = await getAliases();
        let print = false;

        if (args[0] === printArg) {
            print = true;
            args.splice(0, 1);
        }

        const matchingAlias = aliases.find(item => {
            return item.name === args[0];
        });

        if (matchingAlias === undefined) {
            return Promise.reject(new Error(`No alias matching ${args[0]}`));
        }

        const command = parseCommand(matchingAlias.cmd);
        const commandText = injectArguments(
            command,
            args.slice(1),
            process.cwd()
        );

        const cmdSplit = commandText.split(' ');

        if (print) {
            return ConsoleInterface.printLine(commandText);
        }

        return runCmdInConsole(cmdSplit[0], cmdSplit.slice(1), true);
    });
}
