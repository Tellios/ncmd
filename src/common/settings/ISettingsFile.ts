import { NcliCommand } from './NcliCommand';
import { ISettings } from './ISettings';

export interface ISettingsFile {
  version: number;
  settings: ISettings;
}
