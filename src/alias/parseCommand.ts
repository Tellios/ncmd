import { positionalArgsRegexProvider } from "./positionalArgsRegexProvider";

export const parseCommand = (commandText: string): Alias.ICommand => {
    if (commandText === '') {
        throw new Error('Command text is an empty string');
    }

    const positionalArgsRegex = positionalArgsRegexProvider();
    let matches: string[] | null;
    const positionalArguments: string[] = [];

    while ((matches = positionalArgsRegex.exec(commandText)) !== null) {
        const existingArg = positionalArguments.find((arg) => {
            return arg === matches![0];
        });

        if (!existingArg) {
            positionalArguments.push(matches[0]);
        }
    }

    return {
        commandText,
        positionalArguments
    };
}
