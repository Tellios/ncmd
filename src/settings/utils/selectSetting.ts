import {
  selectItem,
  NcliCommand,
  IAvailableSetting,
  availableSettings
} from '../../common';

export const selectSetting = async (
  command: NcliCommand
): Promise<IAvailableSetting> => {
  const commandSettings = availableSettings[command];
  const index = await selectItem(
    commandSettings.map(s => `${s.key} (${s.type}): ${s.description}`)
  );

  return commandSettings[index];
};
