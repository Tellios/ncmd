import { SettingScope } from './SettingScope';

export interface ISetting {
  key: string;
  scope: SettingScope;
  workingDirectory?: string;
  value: boolean;
}
