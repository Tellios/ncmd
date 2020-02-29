import { ConsoleInterface } from '../../common';
import { parseCommand } from './parseCommand';
import { resolveMissingArguments } from './resolveMissingArguments';
import { parseUserArguments } from './parseUserArguments';
import { injectArguments } from './injectArguments';
import { executeCmd } from './executeCommand';

export const executeAlias = async (
    alias: Alias.IAlias,
    print: boolean,
    args: string[]
) => {
    const command = parseCommand(alias.cmd);
    const userArguments = await resolveMissingArguments(
        alias,
        parseUserArguments(args)
    );
    const commandTexts = injectArguments(command, userArguments, process.cwd());

    if (print) {
        for (const commandText of commandTexts) {
            ConsoleInterface.printLine(commandText);
        }
    } else {
        for (const commandText of commandTexts) {
            await executeCmd(commandText, alias.workingDirectory);
        }
    }
};
