import * as process from 'process';
import { commandBase } from '../base';
import { runCmdInConsole, ConsoleInterface, Type } from '../../src/utils';
import {
    injectArguments,
    parseCommand,
    getAliases,
    getAliasHelpTableContent,
    parseUserArguments
} from '../../src/alias';
import { selectItem } from '../../src/utils';
import chalk from 'chalk';

const args = process.argv.slice(2);
const printArg = '--print';
const listArg = '--list';
const listArgShort = '-l';

async function executeCmd(
    cmd: string,
    workingDirectory?: string
): Promise<void> {
    const cmdSplit = cmd.split(' ');

    return runCmdInConsole(
        cmdSplit[0],
        cmdSplit.slice(1),
        true,
        workingDirectory
    );
}

function hasListArg() {
    return (
        args.length === 1 &&
        (args[0] === printArg ||
            args[0] === listArg ||
            args[0] === listArgShort)
    );
}

if (args.length === 0) {
    commandBase(async () => {
        const aliases = await getAliases();

        const aliasNames = aliases.map(alias => alias.name);
        const selectedIndex = await selectItem(
            aliasNames,
            'Select alias to execute'
        );

        const alias = aliases[selectedIndex];

        if (Array.isArray(alias.cmd)) {
            for (const cmd of alias.cmd) {
                await executeCmd(cmd, alias.workingDirectory);
            }
        } else {
            await executeCmd(alias.cmd, alias.workingDirectory);
        }
    });
} else if (hasListArg()) {
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
        const userArguments = parseUserArguments(args.slice(1));
        const commandTexts = injectArguments(
            command,
            userArguments,
            process.cwd()
        );

        if (print) {
            for (const commandText of commandTexts) {
                ConsoleInterface.printLine(commandText);
            }
        } else {
            for (const commandText of commandTexts) {
                await executeCmd(commandText, matchingAlias.workingDirectory);
            }
        }
    });
}
