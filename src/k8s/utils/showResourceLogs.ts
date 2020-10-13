import { runCmdInConsole } from '../../common';

export const showResourceLogs = async (
  follow: boolean,
  resourceName: string,
  containerName: string
): Promise<void> => {
  const args = ['logs'];
  follow && args.push('-f');
  args.push(resourceName);
  args.push('--container');
  args.push(containerName);

  await runCmdInConsole('kubectl', args);
};
