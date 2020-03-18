import { outputJSON } from 'fs-extra';
import { getSettingsFilename } from './getSettingsFilename';
import { ISettings } from './ISettings';
import { ISettingsFile } from './ISettingsFile';

export const persistSettings = async (settings: ISettings) => {
  const settingsFilename = getSettingsFilename();

  const settingsFile: ISettingsFile = {
    version: 1,
    settings
  };

  await outputJSON(settingsFilename, settingsFile, {
    spaces: 2
  });
};
