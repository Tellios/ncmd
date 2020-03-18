import { NcliCommand } from './NcliCommand';
import { ISetting } from './ISetting';

export type ISettings = Partial<Record<NcliCommand, ISetting[]>>;
