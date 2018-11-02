import { runCmdInConsole } from '../utils';

export const addAll = (repositoryPath: string) => {
    return runCmdInConsole('git', ['add', '.'], true, repositoryPath);
};
