import {
  deleteSettings,
  getSettings,
  ConsoleInterface,
  Type,
  selectItems
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
  const indexes = await selectItems({
    items: selectables,
    message: 'Select items to delete'
  });
  const selectedSettings = indexes.map(index => commandSettings[index]);

  await deleteSettings(command, selectedSettings);
};
