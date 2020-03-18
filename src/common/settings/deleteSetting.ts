import { NcliCommand } from './NcliCommand';
import { ISetting } from './ISetting';
import { getSettings } from './getSettings';
import { persistSettings } from './persistSettings';

export const deleteSetting = async (
  command: NcliCommand,
  setting: Omit<ISetting, 'value'>
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

  settings[command] = commandSettings;

  await persistSettings(settings);
};
