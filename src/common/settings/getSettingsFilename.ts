import * as path from 'path';
import { getNcliDir } from '../paths';

export const getSettingsFilename = (): string => {
  return path.join(getNcliDir(), '.settings.json');
};
