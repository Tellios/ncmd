import { getSettings, ConsoleInterface, Type } from '../../common';
import { selectCommandToConfigure, getPrintableSettings } from '../utils';

export const listCommand = async () => {
  const settings = await getSettings();

  const commandsWithSettings = Object.keys(settings);

  if (commandsWithSettings.length === 0) {
    ConsoleInterface.printLine(`Settings file is empty`, Type.warn);
    return;
  }

  const command = await selectCommandToConfigure();
  const commandSettings = settings[command]!;

  const settingsList = getPrintableSettings(commandSettings);

  ConsoleInterface.printLines(settingsList);
};
