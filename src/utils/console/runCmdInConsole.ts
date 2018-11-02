import { CmdError } from './CmdError';
import * as execa from 'execa';
import { ExecaError } from 'execa';

function isExecaError(error: any): error is ExecaError {
    return error.code != null;
}

export async function runCmdInConsole(
    cmd: string,
    args: string[],
    inheritStdio: boolean = true,
    cwd: string | undefined = undefined
): Promise<void> {
    try {
        await execa(cmd, args, {
            stdio: inheritStdio ? 'inherit' : undefined,
            cwd
        });
    } catch (error) {
        if (isExecaError(error)) {
            throw new CmdError(error.code, error.message, 'Command failed');
        }

        throw new Error('Command failed with an unknown error');
    }
}
