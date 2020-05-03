import {
  availableSettings,
  NcliCommand,
  ISettingDescription,
  SettingType
} from '../../common';

export const supportedNcliCommands: NcliCommand[] = Object.entries(
  availableSettings
)
  .filter(([_, settings]) => {
    return (
      Object.entries(settings).filter(
        ([_, description]: [string, ISettingDescription<SettingType>]) => {
          return !description.hidden;
        }
      ).length > 0
    );
  })
  .map(([key, _]) => key) as NcliCommand[];
