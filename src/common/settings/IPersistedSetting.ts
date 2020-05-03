import { SettingScope } from './SettingScope';
import { SettingValue } from './SettingValue';

export interface IPersistedSetting {
  key: string;
  scope: SettingScope;
  workingDirectory?: string;
  value: SettingValue;
}
