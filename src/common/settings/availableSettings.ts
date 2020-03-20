import { NcliCommand } from '../../common';
import { IAvailableSetting } from './IAvailableSetting';

export const availableSettings: Record<NcliCommand, IAvailableSetting[]> = {
  ncommit: [
    {
      key: 'noVerify',
      description: 'Sets the default value used for noVerify',
      type: 'boolean'
    }
  ]
};
