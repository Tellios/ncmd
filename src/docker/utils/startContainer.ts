import { runCmdInConsole } from '../../common';

export const startContainer = (containerId: string): Promise<void> => {
  return runCmdInConsole('docker', ['start', containerId]);
};
