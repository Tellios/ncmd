import { selectPackages } from './selectPackages';
import { installPackages } from './installPackages';

export async function updatePackages(
    workingDirectory: string,
    packageJson: NcliNode.PackageJson
): Promise<void> {
    const packages = await selectPackages(packageJson);
    const addLatestSuffix = (name: string) => `${name}@latest`;

    const packagesToUpdate = packages
        .filter(p => !p.dev)
        .map(p => p.name)
        .map(addLatestSuffix);
    const devPackagesToUpdate = packages
        .filter(p => p.dev)
        .map(p => p.name)
        .map(addLatestSuffix);

    await installPackages(
        workingDirectory,
        packagesToUpdate,
        devPackagesToUpdate,
        'ignore'
    );

    // if (await containsYarnLockFile(workingDirectory)) {
    //     if (packagesToUpdate.length > 0) {
    //         await runCmdInConsole('yarn', ['add', ...packagesToUpdate]);
    //     }

    //     if (devPackagesToUpdate.length > 0) {
    //         await runCmdInConsole('yarn', ['add', ...devPackagesToUpdate]);
    //     }
    // } else if (await containsPackageLockFile(workingDirectory)) {
    //     if (packagesToUpdate.length > 0) {
    //         await runCmdInConsole('npm', ['i', ...packagesToUpdate]);
    //     }

    //     if (devPackagesToUpdate.length > 0) {
    //         await runCmdInConsole('yarn', ['add', ...devPackagesToUpdate]);
    //     }
    // } else {
    //     ConsoleInterface.printLine('No yarn or npm lock file found');
    // }
}
