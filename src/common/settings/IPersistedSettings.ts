import { NcliCommand } from './NcliCommand';
import { IPersistedSetting } from './IPersistedSetting';

export type IPersistedSettings = Partial<
  Record<NcliCommand, IPersistedSetting[]>
>;
