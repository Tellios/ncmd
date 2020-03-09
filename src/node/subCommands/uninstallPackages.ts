import { ConsoleInterface, runCmdInConsole } from '../../common';
import { selectPackages } from './selectPackages';
import { containsPackageLockFile, containsYarnLockFile } from '../utils';

export async function uninstallPackages(
  workingDirectory: string,
  packageJson: NcliNode.PackageJson,
  searchString?: string
): Promise<void> {
  const packages = await selectPackages(packageJson, searchString);
  const packageNames = packages.map(p => p.name);

  if (await containsYarnLockFile(workingDirectory)) {
    await runCmdInConsole('yarn', ['remove', ...packageNames]);
  } else if (await containsPackageLockFile(workingDirectory)) {
    await runCmdInConsole('npm', ['uninstall', ...packageNames]);
  } else {
    ConsoleInterface.printLine('No yarn or npm lock file found');
  }
}
