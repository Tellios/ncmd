import { commandBase } from '../../base';
import { getAliases, executeAlias } from '../../../src/alias';
import { selectItem } from '../../../src/utils';

export const selectAliasAndExecute = async () => {
    await commandBase(async () => {
        const aliases = await getAliases();

        const aliasNames = aliases.map(alias => alias.name);
        const selectedIndex = await selectItem(
            aliasNames,
            'Select alias to execute'
        );

        const alias = aliases[selectedIndex];

        executeAlias(alias, false, []);
    });
};
