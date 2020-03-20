import { SettingScope } from './SettingScope';

export interface IPersistedSetting {
  key: string;
  scope: SettingScope;
  workingDirectory?: string;
  value: boolean;
}
