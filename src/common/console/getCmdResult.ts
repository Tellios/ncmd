import * as cp from 'child_process';

export const getCmdResult = (
  cmd: string,
  args: string[],
  cwd?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cp.exec(
      [cmd, ...args].join(' '),
      {
        cwd
      },
      (error: cp.ExecException | null, stdout: string) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(stdout);
      }
    );
  });
};
