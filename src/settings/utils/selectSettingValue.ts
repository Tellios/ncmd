import { cyanBright } from 'chalk';
import { confirm, UnreachableCaseError, IAvailableSetting } from '../../common';

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
