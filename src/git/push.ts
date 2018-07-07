import { setUpstream, getCurrentBranch } from './';
import { runCmdInConsole, CmdError, confirm } from '../utils';

export async function push(workingDirectory: string): Promise<void> {
    try {
        await runCmdInConsole('git', ['push']);
    } catch (error) {
        if (error instanceof CmdError) {
            if (
                error.exitCode === 128 &&
                /git push --set-upstream/.test(error.processMessage)
            ) {
                if (
                    await confirm(
                        'Upstream must be set to push, do you want to set it?'
                    )
                ) {
                    const currentBranch = await getCurrentBranch(
                        workingDirectory
                    );

                    return await setUpstream(currentBranch.name);
                } else {
                    return;
                }
            } else {
                throw new Error(error.processMessage);
            }
        }

        throw error;
    }
}
