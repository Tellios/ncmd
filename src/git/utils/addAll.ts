import { runCmdInConsole } from '../../common';

export const addAll = (repositoryPath: string) => {
    return runCmdInConsole('git', ['add', '.'], true, repositoryPath);
};
