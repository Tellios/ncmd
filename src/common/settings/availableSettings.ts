import { NcliCommand } from '../../common';
import { ISettingDescription } from './ISettingDescription';

/**
 * To be able to create the inferred types for the
 * ISettingsFor interface a little bit of complexity
 * is required. The below class solution to generate
 * the setting descriptions essentially mimics
 * yargs builder type definitions.
 *
 * Without this approach, keys of the setting
 * descriptions wouldn't be inferrable.
 */
class Builder<T = {}> {
  private settings: any = {};

  public add<K extends string>(
    key: K,
    description: ISettingDescription
  ): Builder<T & { [key in K]: ISettingDescription }> {
    this.settings[key] = description;
    return this as any;
  }

  public getSettings(): T {
    return this.settings;
  }
}

export const availableSettings = {
  ncommit: new Builder()
    .add('noVerify', {
      description: 'Sets the default for noVerify',
      type: 'boolean'
    })
    .add('addAll', {
      description: 'Sets the default for addAll',
      type: 'boolean'
    })
    .add('push', {
      description: 'Sets the default for push',
      type: 'boolean'
    })
    .getSettings()
};

export type IAvailableSettings = typeof availableSettings;
