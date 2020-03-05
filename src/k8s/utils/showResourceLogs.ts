import { runCmdInConsole } from '../../common';

export const showResourceLogs = async (
  follow: boolean,
  resourceName: string
) => {
  const args = ['logs'];
  follow && args.push('-f');
  args.push(resourceName);

  await runCmdInConsole('kubectl', args);
};
