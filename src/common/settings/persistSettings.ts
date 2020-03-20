import { outputJSON } from 'fs-extra';
import { getSettingsFilename } from './getSettingsFilename';
import { IPersistedSettings } from './IPersistedSettings';
import { ISettingsFile } from './ISettingsFile';

export const persistSettings = async (settings: IPersistedSettings) => {
  const settingsFilename = getSettingsFilename();

  const settingsFile: ISettingsFile = {
    version: 1,
    settings
  };

  await outputJSON(settingsFilename, settingsFile, {
    spaces: 2
  });
};
