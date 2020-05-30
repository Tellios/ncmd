import { runCmdInConsole } from '../../common';

export const deleteContainer = (
  force: boolean,
  containerId: string
): Promise<void> => {
  const args = ['rm'];

  if (force === true) {
    args.push('-f');
  }

  args.push(containerId);

  return runCmdInConsole('docker', args);
};
