import {
  selectItem,
  NcliCommand,
  ISettingDescription,
  availableSettings
} from '../../common';

export const selectSetting = async (
  command: NcliCommand
): Promise<[string, ISettingDescription]> => {
  const commandSettings = availableSettings[command];
  const settingEntries = Object.entries<ISettingDescription>(commandSettings);

  const index = await selectItem(
    settingEntries.map(
      ([key, { type, description }]) => `${key} (${type}): ${description}`
    )
  );

  return settingEntries[index];
};
