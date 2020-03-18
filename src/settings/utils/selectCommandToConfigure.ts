import { selectItem } from '../../common';
import { supportedNcliCommands } from './supportedNcliCommands';

export const selectCommandToConfigure = async () => {
  const index = await selectItem(
    supportedNcliCommands,
    'Select command to configure'
  );

  return supportedNcliCommands[index];
};
