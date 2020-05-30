import { runCmdInConsole } from '../../common';

export const stopContainer = (containerId: string): Promise<void> => {
  return runCmdInConsole('docker', ['stop', containerId]);
};
