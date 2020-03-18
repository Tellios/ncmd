import { cwd } from 'process';
import { updateSetting } from '../../common';
import {
  selectCommandToConfigure,
  selectScope,
  selectSetting,
  selectSettingValue
} from '../utils';

export const setCommand = async () => {
  const command = await selectCommandToConfigure();
  const setting = await selectSetting(command);
  const scope = await selectScope();
  const value = await selectSettingValue(setting);

  await updateSetting(command, {
    key: setting.key,
    scope,
    workingDirectory: scope === 'workingDirectory' ? cwd() : undefined,
    value
  });
};
