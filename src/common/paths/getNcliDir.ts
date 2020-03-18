import * as path from 'path';
import * as os from 'os';

export const getNcliDir = (): string => {
  return path.join(os.homedir(), '.ncli');
};
