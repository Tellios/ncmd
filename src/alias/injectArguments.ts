import { colorizeCommand } from './colorizeCommand';

export const injectArguments = (
    command: Alias.ICommand,
    userArguments: string[],
    workingDirectory: string
): string => {
    if (command.positionalArguments.length > 0
        && userArguments.length < command.positionalArguments.length) {
        throw new Error(`Some positional arguments are missing: ${colorizeCommand(command.commandText)}`);
    }

    let commandWithArgs = command.commandText;

    userArguments.forEach((userArg: string, index: number) => {
        if (index < command.positionalArguments.length) {
            const positionalArgument = command.positionalArguments[index];

            while (commandWithArgs.indexOf(positionalArgument) !== -1) {
                commandWithArgs = commandWithArgs.replace(positionalArgument, userArg);
            }
        } else {
            commandWithArgs += ` ${userArg}`;
        }
    });

    return commandWithArgs.replace(/\${cwd}/g, workingDirectory);
};
