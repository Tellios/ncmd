import { parsePackageJson } from '../../src/node';
import { yargsWrapper, ConsoleInterface } from '../../src/utils';
import { commandBase } from '../base';
import {
    installAllPackagesUsingLockFile,
    uninstallPackages,
    installPackages,
    AutoInstallTypingsMode,
    updatePackages
} from './subCommands';

const args = yargsWrapper(false)
    .command('add', 'Install one or more packages', {
        dev: {
            alias: 'd',
            desc: 'All packages after dev will be installed as dev packages'
        },
        'auto-types': {
            alias: 'a',
            desc: [
                'Automatically install @types packages for the packages being installed. ',
                'If autoTypes is provided after the dev flag, ',
                'they will be installed as dev packages'
            ].join('')
        }
    })
    .command('del', 'Uninstall one or more packages')
    .command(
        'update',
        'Update one or more packages to the latest version. Packages will be specified using a multiselect list'
    ).argv;

commandBase(
    async (workingDirectory: string): Promise<any> => {
        const packageJson = await parsePackageJson(workingDirectory);

        if (args._[0] === 'add') {
            const addArgs = process.argv.slice(3);
            const packagesToInstall: string[] = [];
            const devPackagesToInstall: string[] = [];
            let devFlag = false;
            let typingsMode: AutoInstallTypingsMode = 'ignore';

            addArgs.forEach(addArg => {
                if (addArg === '-da') {
                    devFlag = true;
                    typingsMode = 'installAsDev';
                } else if (addArg === '-ad') {
                    devFlag = true;
                    typingsMode = 'install';
                } else if (addArg === '--dev' || addArg === '-d') {
                    devFlag = true;
                } else if (addArg === '--auto-types' || addArg === '-a') {
                    typingsMode = devFlag ? 'installAsDev' : 'install';
                } else if (devFlag) {
                    devPackagesToInstall.push(addArg);
                } else {
                    packagesToInstall.push(addArg);
                }
            });

            return await installPackages(
                workingDirectory,
                packagesToInstall,
                devPackagesToInstall,
                typingsMode
            );
        } else if (args._[0] === 'del') {
            return await uninstallPackages(workingDirectory, packageJson);
        } else if (args._[0] === 'update') {
            return await updatePackages(workingDirectory, packageJson);
        } else if (args._.length > 0) {
            ConsoleInterface.printLine('Unknown command');
        } else {
            await installAllPackagesUsingLockFile(workingDirectory);
        }
    }
);
