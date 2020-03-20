import { NcliCommand } from './NcliCommand';
import { IPersistedSetting } from './IPersistedSetting';
import { getSettings } from './getSettings';
import { persistSettings } from './persistSettings';

export const deleteSetting = async (
  command: NcliCommand,
  setting: Omit<IPersistedSetting, 'value'>
) => {
  const settings = await getSettings();

  let commandSettings = settings[command] ?? [];
  commandSettings = commandSettings.filter(
    cs =>
      !(
        cs.key === setting.key &&
        cs.scope === setting.scope &&
        cs.workingDirectory === setting.workingDirectory
      )
  );

  // Make sure to remove the command from settings entirely if no
  // settings have been made for the command
  settings[command] = commandSettings.length > 0 ? commandSettings : undefined;

  await persistSettings(settings);
};
