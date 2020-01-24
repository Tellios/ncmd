import { runCmdInConsole } from '../utils';

export async function executeCmd(
    cmd: string,
    workingDirectory?: string
): Promise<void> {
    const cmdSplit = cmd.split(' ');

    return runCmdInConsole(
        cmdSplit[0],
        cmdSplit.slice(1),
        true,
        workingDirectory
    );
}
