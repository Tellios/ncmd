import { cyanBright } from 'chalk';
import {
  confirm,
  inputString,
  UnreachableCaseError,
  ISettingDescription
} from '../../common';

export const selectSettingValue = async (
  settingKey: string,
  setting: ISettingDescription<'boolean' | 'string'>
): Promise<boolean | string> => {
  const key = cyanBright(settingKey);

  switch (setting.type) {
    case 'boolean':
      return await confirm(`Should ${key} be enabled`);
    case 'string':
      return await inputString(`Set the value`);
    default:
      throw new UnreachableCaseError(setting.type);
  }
};
