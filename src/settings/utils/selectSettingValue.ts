import { cyanBright } from 'chalk';
import { confirm, UnreachableCaseError } from '../../common';
import { IAvailableSetting } from './IAvailableSetting';

export const selectSettingValue = async (
  setting: IAvailableSetting
): Promise<any> => {
  const key = cyanBright(setting.key);

  switch (setting.type) {
    case 'boolean':
      return await confirm(`Should ${key} be enabled`);
    default:
      throw new UnreachableCaseError(setting.type);
  }
};
