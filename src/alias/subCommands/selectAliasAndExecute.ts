import { selectItem, commandBase } from '../../common';
import { getAliases, executeAlias } from '../utils';

export const selectAliasAndExecute = async (): Promise<void> => {
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
