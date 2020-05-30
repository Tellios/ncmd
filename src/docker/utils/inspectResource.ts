import { runCmdInConsole } from '../../common';

export const inspectResource = async (resourceId: string): Promise<void> => {
  await runCmdInConsole('docker', ['inspect', resourceId]);
};
