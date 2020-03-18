import {
  deleteSetting,
  getSettings,
  ConsoleInterface,
  Type
} from '../../common';
import { selectCommandToConfigure, selectSetting, selectScope } from '../utils';

export const deleteCommand = async () => {
  const settings = await getSettings();

  const commandsWithSettings = Object.keys(settings);

  if (commandsWithSettings.length === 0) {
    ConsoleInterface.printLine(`Settings file is empty`, Type.warn);
    return;
  }

  const command = await selectCommandToConfigure();
  const commandSettings = settings[command]!;

  // create list of made settings to select from
  
  await deleteSetting(command);
};
