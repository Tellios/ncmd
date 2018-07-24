import { commandBase } from '../base';
import { yargsWrapper } from '../../src/utils';
import {
    parsePackageJson,
    executePackageJsonScript,
    selectScript
} from '../../src/node';
import { selectItems } from '../../src/utils';
import {
    listPackageJsonScripts,
    addPackageJsonScript,
    deletePackageJsonScript,
    editPackageJsonScript,
    runScripts,
    selectScripts
} from './subCommands';

const args = yargsWrapper()
    .option('list', {
        alias: 'l',
        describe: 'Lists the available NPM scripts',
        type: 'boolean'
    })
    .option('add', {
        alias: 'a',
        describe: 'Add a new NPM script',
        type: 'boolean'
    })
    .option('async', {
        describe: 'Select multiple NPM scripts to run concurrently'
    })
    .option('edit', {
        alias: 'e',
        describe: 'Edit an existing NPM script',
        type: 'boolean'
    })
    .option('delete', {
        alias: 'd',
        describe: 'Delete an existing NPM script',
        type: 'boolean'
    }).argv;

commandBase(async (workingDirectory: string): Promise<any> => {
    const packageJson = await parsePackageJson(workingDirectory);

    if (args.list) {
        listPackageJsonScripts(packageJson.scripts);
    } else if (args.add) {
        await addPackageJsonScript(workingDirectory, packageJson);
    } else if (args.edit) {
        await editPackageJsonScript(workingDirectory, packageJson);
    } else if (args.delete) {
        await deletePackageJsonScript(workingDirectory, packageJson);
    } else if (args.async) {
        await selectScripts(packageJson);
    } else if (args._ && args._.length > 0) {
        await runScripts(args._, packageJson);
    } else {
        const selectedScript = await selectScript(packageJson.scripts);
        await executePackageJsonScript(selectedScript, packageJson.scripts);
    }
});
