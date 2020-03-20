import { IPersistedSettings } from './IPersistedSettings';

export interface ISettingsFile {
  version: number;
  settings: IPersistedSettings;
}
