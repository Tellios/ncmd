import { getSettings } from './getSettings';
import { IPersistedSetting } from './IPersistedSetting';
import { NcliCommand } from './NcliCommand';
import { persistSettings } from './persistSettings';

export const updateSetting = async (
  command: NcliCommand,
  setting: IPersistedSetting
) => {
  const settings = await getSettings();
  const commandSettings = settings[command] ?? [];

  const index = commandSettings.findIndex(
    cs =>
      cs.key === setting.key &&
      cs.scope === setting.scope &&
      cs.workingDirectory === setting.workingDirectory
  );

  if (index === -1) {
    commandSettings.push(setting);
  } else {
    commandSettings[index] = setting;
  }

  settings[command] = commandSettings;

  await persistSettings(settings);
};
