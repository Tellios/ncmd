import { runCmdInConsole, ConsoleInterface } from '../../common';
import { containsYarnLockFile, containsPackageLockFile } from '../utils';

export type AutoInstallTypingsMode = 'ignore' | 'installAsDev' | 'install';

export async function installPackages(
  workingDirectory: string,
  packagesToInstall: string[],
  devPackagesToInstall: string[],
  autoInstallTypings: AutoInstallTypingsMode
): Promise<void> {
  if (await containsYarnLockFile(workingDirectory)) {
    if (packagesToInstall.length > 0) {
      await runCmdInConsole('yarn', ['add', ...packagesToInstall]);
    }

    if (devPackagesToInstall.length > 0) {
      await runCmdInConsole('yarn', ['add', '--dev', ...devPackagesToInstall]);
    }
  } else if (await containsPackageLockFile(workingDirectory)) {
    if (packagesToInstall.length > 0) {
      await runCmdInConsole('npm', ['i', ...packagesToInstall]);
    }

    if (devPackagesToInstall.length > 0) {
      await runCmdInConsole('npm', ['i', '-D', ...devPackagesToInstall]);
    }
  } else {
    ConsoleInterface.printLine('No yarn or npm lock file found');
    return;
  }

  const addTypesPrefix = (p: string) => `@types/${p}`;

  if (autoInstallTypings === 'install') {
    await installPackages(
      workingDirectory,
      [
        ...packagesToInstall.map(addTypesPrefix),
        ...devPackagesToInstall.map(addTypesPrefix)
      ],
      [],
      'ignore'
    );
  } else if (autoInstallTypings === 'installAsDev') {
    await installPackages(
      workingDirectory,
      [],
      [
        ...packagesToInstall.map(addTypesPrefix),
        ...devPackagesToInstall.map(addTypesPrefix)
      ],
      'ignore'
    );
  }
}
