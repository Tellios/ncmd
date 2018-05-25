import * as inquirer from 'inquirer';
import { setUpstream, getCurrentBranch } from './';
import { runCmdInConsole, CmdError } from '../utils';

export async function push(workingDirectory: string): Promise<void> {
    try {
        await runCmdInConsole('git', ['push']);
    } catch (error) {
        if (error instanceof CmdError) {
            if (
                error.exitCode === 128 &&
                /git push --set-upstream/.test(error.processMessage)
            ) {
                const choice: any = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'setUpstream',
                        message:
                            'Upstream must be set to push, do you want to set it?',
                        choices: ['Yes', 'No']
                    }
                ]);

                if (choice.setUpstream === 'Yes') {
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
