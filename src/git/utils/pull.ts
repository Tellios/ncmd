import { runCmdInConsole } from '../../common';

export const pull = (): Promise<void> => {
  return runCmdInConsole('git', ['pull']);
};
