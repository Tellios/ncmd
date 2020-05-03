import * as process from 'process';
import { uniqBy } from 'lodash';
import { ConsoleInterface, Type } from '../console';
import { NcliCommand } from './NcliCommand';
import { ISettings } from './ISettings';
import { IPersistedSetting } from './IPersistedSetting';
import { IPersistedSettings } from './IPersistedSettings';

export const getAggregatedCommandSettings = async (
  command: NcliCommand,
  settings: IPersistedSettings
): Promise<ISettings> => {
  const commandSettings = settings[command] ?? [];

  const settingsInScope = getSettingsInCurrentScope(commandSettings);
  const uniqueSettingKeys: string[] = getUniqueSettingKeys(settingsInScope);

  return getAggregatedSettings(uniqueSettingKeys, settingsInScope);
};

const getSettingsInCurrentScope = (
  settings: IPersistedSetting[]
): IPersistedSetting[] => {
  const cwd = process.cwd();

  return settings.filter(
    s => s.scope === 'global' || s.workingDirectory === cwd
  );
};

const getUniqueSettingKeys = (settings: IPersistedSetting[]): string[] => {
  return uniqBy(settings, s => s.key).map(s => s.key);
};

const getAggregatedSettings = (
  keys: string[],
  settings: IPersistedSetting[]
): ISettings => {
  return keys.reduce((aggregatedSettings: ISettings, key) => {
    const global = getGlobalSetting(settings, key);
    const workingDirectory = getWorkingDirectorySetting(settings, key);
    const value = getAggregatedValue(global, workingDirectory);

    if (value !== undefined) {
      aggregatedSettings[key] = value;
    } else {
      ConsoleInterface.printLine(
        `Setting '${key}' is unexpectedly missing a value`,
        Type.warn
      );
    }

    return aggregatedSettings;
  }, {});
};

const getGlobalSetting = (
  settings: IPersistedSetting[],
  key: string
): IPersistedSetting | undefined => {
  return settings.find(s => s.key === key && s.scope === 'global');
};

const getWorkingDirectorySetting = (
  settings: IPersistedSetting[],
  key: string
): IPersistedSetting | undefined => {
  return settings.find(s => s.key === key && s.scope === 'workingDirectory');
};

const getAggregatedValue = (
  global?: IPersistedSetting,
  workingDirectory?: IPersistedSetting
): boolean | string | undefined => {
  return workingDirectory?.value ?? global?.value;
};
