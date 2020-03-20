import { cyanBright } from 'chalk';
import {
  confirm,
  UnreachableCaseError,
  ISettingDescription
} from '../../common';

export const selectSettingValue = async (
  settingKey: string,
  setting: ISettingDescription
): Promise<boolean> => {
  const key = cyanBright(settingKey);

  switch (setting.type) {
    case 'boolean':
      return await confirm(`Should ${key} be enabled`);
    default:
      throw new UnreachableCaseError(setting.type);
  }
};
