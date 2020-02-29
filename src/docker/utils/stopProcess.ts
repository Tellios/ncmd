import { runCmdInConsole } from '../../common';

export const stopProcess = (processId: string): Promise<void> => {
  return runCmdInConsole('docker', ['stop', processId]);
};
