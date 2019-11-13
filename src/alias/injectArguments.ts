import { colorizeCommand } from '../utils';

export const injectArguments = (
    commands: Alias.ICommand[],
    userArguments: string[],
    workingDirectory: string
): string[] => {
    return commands.map(command =>
        injectArgumentsIntoCommandText(
            command.commandText,
            command.positionalArguments,
            userArguments,
            workingDirectory
        )
    );
};

function injectArgumentsIntoCommandText(
    commandText: string,
    positionalArguments: string[],
    userArguments: string[],
    workingDirectory: string
): string {
    if (
        positionalArguments.length > 0 &&
        userArguments.length < positionalArguments.length
    ) {
        throw new Error(
            `Some positional arguments are missing: ${colorizeCommand(
                commandText
            )}`
        );
    }

    // TODO: Rebuild entire command parsing...
    // Currently we can't handle the case where we have both positional,
    // and ordinary args since we can't determine which args are ordinary
    // args for which command
    let commandWithArgs = commandText;

    positionalArguments.forEach(posArg => {
        const userArgumentsIndex = Number(posArg.substr(1)) - 1;
        const userArg = userArguments[userArgumentsIndex];

        while (commandWithArgs.indexOf(posArg) !== -1) {
            commandWithArgs = commandWithArgs.replace(posArg, userArg);
        }
    });

    // userArguments.forEach((userArg: string, index: number) => {
    //     if (index < positionalArguments.length) {
    //         const positionalArgument = positionalArguments[index];

    //         while (commandWithArgs.indexOf(positionalArgument) !== -1) {
    //             commandWithArgs = commandWithArgs.replace(
    //                 positionalArgument,
    //                 userArg
    //             );
    //         }
    //     } else {
    //         commandWithArgs += ` ${userArg}`;
    //     }
    // });

    return commandWithArgs.replace(/\${cwd}/g, workingDirectory);
}
