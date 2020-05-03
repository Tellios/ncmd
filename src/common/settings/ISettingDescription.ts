import { SettingType } from './SettingType';

export interface ISettingDescription<TSettingType extends SettingType> {
  description: string;
  type: TSettingType;
  hidden?: boolean;
}
