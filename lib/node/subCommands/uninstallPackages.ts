import { selectPackages } from './selectPackages';
import {
    containsPackageLockFile,
    containsYarnLockFile
} from '../../../src/node';
import { ConsoleInterface, runCmdInConsole } from '../../../src/utils';

export async function uninstallPackages(
    workingDirectory: string,
    packageJson: NcliNode.PackageJson
): Promise<void> {
    const packages = await selectPackages(packageJson);
    const packageNames = packages.map(p => p.name);

    if (await containsYarnLockFile(workingDirectory)) {
        await runCmdInConsole('yarn', ['remove', ...packageNames]);
    } else if (await containsPackageLockFile(workingDirectory)) {
        await runCmdInConsole('npm', ['uninstall', ...packageNames]);
    } else {
        ConsoleInterface.printLine('No yarn or npm lock file found');
    }
}
