import { runCmdInConsole } from '../../common';

export const checkout = (reference: string): Promise<void> => {
  return runCmdInConsole('git', ['checkout', reference]);
};
