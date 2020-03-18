import { selectItem, NcliCommand } from '../../common';
import { IAvailableSetting } from './IAvailableSetting';
import { availableSettings } from './availableSettings';

export const selectSetting = async (
  command: NcliCommand
): Promise<IAvailableSetting> => {
  const commandSettings = availableSettings[command];
  const index = await selectItem(
    commandSettings.map(s => `${s.key} (${s.type}): ${s.description}`)
  );

  return commandSettings[index];
};
