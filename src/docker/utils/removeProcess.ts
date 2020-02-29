import { runCmdInConsole } from '../../common';

export const removeProcess = (
  force: boolean,
  processId: string
): Promise<void> => {
  const args = ['rm'];

  if (force === true) {
    args.push('-f');
  }

  args.push(processId);

  return runCmdInConsole('docker', args);
};
