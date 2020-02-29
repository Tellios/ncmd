import { runCmdInConsole, ConsoleInterface } from '../../common';
import { containsPackageLockFile, containsYarnLockFile } from '../utils';

export async function installAllPackagesUsingLockFile(
    workingDirectory: string
): Promise<void> {
    if (await containsYarnLockFile(workingDirectory)) {
        await runCmdInConsole('yarn', [], true, workingDirectory);
    } else if (await containsPackageLockFile(workingDirectory)) {
        await runCmdInConsole('npm', ['ci'], true, workingDirectory);
    } else {
        ConsoleInterface.printLine(
            'No lock file found, create one first using npm or yarn'
        );
    }
}
