import { colorizeCommand } from '../utils';

export const getAliasHelpTableContent = (
    alias: Alias.IAlias
): Array<object[]> => {
    const texts: any[] = [
        // { name: alias.name, },
        { cmd: colorizeCommand(alias.cmd) }
    ];

    if (alias.description) {
        texts.push({ description: alias.description });
    }

    return texts;
};
