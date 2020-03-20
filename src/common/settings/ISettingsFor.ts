import { ISettingDescription } from './ISettingDescription';
import { NcliCommand } from './NcliCommand';
import { IAvailableSettings } from './availableSettings';

type InferredSettingsValue<S extends ISettingDescription> = S extends {
  type: 'boolean';
}
  ? boolean
  : any;

type InferredSettingsValues<
  S extends { [key: string]: ISettingDescription }
> = { [key in keyof S]: InferredSettingsValue<S[key]> };

export type ISettingsFor<TCommand extends NcliCommand> = Partial<
  InferredSettingsValues<IAvailableSettings[TCommand]>
>;
