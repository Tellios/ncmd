'use strict';

import { commandBase } from '../base';
import {
    yargsWrapper,
    ConsoleInterface,
    runCmdInConsole,
    selectItem
} from '../../src/utils';
import { colorizeCommand } from '../../src/alias';
import { parsePackageJson } from '../../src/node';

const args = yargsWrapper().option('list', {
    alias: 'l',
    describe: 'Lists the available NPM scripts',
    type: 'boolean'
}).argv;

commandBase(async (workingDirectory: string): Promise<any> => {
    const availableScripts = await getPackageJsonScripts(workingDirectory);

    if (args.list) {
        const scriptsTable = Object.keys(availableScripts).map(script => [
            script,
            colorizeCommand(availableScripts[script])
        ]);

        ConsoleInterface.printTable(['Script', 'Command'], scriptsTable);
    } else if (args._ && args._.length > 0) {
        const script = args._[0];
        await executeScript(script, availableScripts);
    } else {
        const scriptNames = Object.keys(availableScripts);
        const selectedIndex = await selectItem(scriptNames, 'Select script');
        const selectedScript = scriptNames[selectedIndex];
        await executeScript(selectedScript, availableScripts);
    }
});

async function getPackageJsonScripts(
    workingDirectory: string
): Promise<NcliNode.Scripts> {
    const packageJson = await parsePackageJson(workingDirectory);
    return packageJson.scripts;
}

async function executeScript(
    script: string,
    availableScripts: NcliNode.Scripts
) {
    if (script in availableScripts) {
        await runCmdInConsole('npm', ['run', script]);
    } else {
        throw Error(`'${script}' not found in package.json`);
    }
}
