import { runCmdInConsole } from '../utils';

export const useContext = async (contextName: string): Promise<void> => {
    await runCmdInConsole('kubectl', ['config', 'use-context', contextName]);
};
