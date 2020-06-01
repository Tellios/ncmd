import { runCmdInConsole } from '../../common';

export const addAll = (repositoryPath: string): Promise<void> => {
  return runCmdInConsole('git', ['add', '.'], true, repositoryPath);
};
