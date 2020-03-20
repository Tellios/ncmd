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
  const [settingKey, settingDescription] = await selectSetting(command);
  const scope = await selectScope();
  const value = await selectSettingValue(settingKey, settingDescription);

  await updateSetting(command, {
    key: settingKey,
    scope,
    workingDirectory: scope === 'workingDirectory' ? cwd() : undefined,
    value
  });
};
