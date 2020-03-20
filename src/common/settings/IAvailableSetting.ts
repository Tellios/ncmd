import { SettingType } from './SettingType';

export interface IAvailableSetting {
  key: string;
  description: string;
  type: SettingType;
}
