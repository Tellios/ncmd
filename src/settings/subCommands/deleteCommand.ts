import {
  deleteSetting,
  getSettings,
  ConsoleInterface,
  Type,
  selectItem
} from '../../common';
import { selectCommandToConfigure, getPrintableSettings } from '../utils';

export const deleteCommand = async () => {
  const settings = await getSettings();

  const commandsWithSettings = Object.keys(settings);

  if (commandsWithSettings.length === 0) {
    ConsoleInterface.printLine(`Settings file is empty`, Type.warn);
    return;
  }

  const command = await selectCommandToConfigure();
  const commandSettings = settings[command]!;

  const selectables = getPrintableSettings(commandSettings);
  const index = await selectItem(selectables);
  const setting = commandSettings[index];

  await deleteSetting(command, setting);
};
