import { ensureFile, readFile } from 'fs-extra';
import { getSettingsFilename } from './getSettingsFilename';
import { ISettingsFile } from './ISettingsFile';
import { IPersistedSettings } from './IPersistedSettings';

export const getSettings = async (): Promise<IPersistedSettings> => {
  const settingsFilename = getSettingsFilename();
  await ensureFile(settingsFilename);

  const data = await readFile(settingsFilename, 'utf8');

  if (data === '') {
    return {};
  }

  const settingsFile: ISettingsFile = JSON.parse(data);
  return settingsFile.settings;
};
