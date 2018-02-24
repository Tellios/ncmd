'use strict';

import * as process from 'process';
import { commandBase } from './base';
import { runCmdInConsole, yargsWrapper } from '../src/utils';
import { injectArguments, parseCommand } from '../src/alias';
import chalk from 'chalk';
import * as jsYaml from 'js-yaml';
import * as fse from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

interface IAlias {
    name: string;
    cmd: string;
}

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('No alias name supplied');
} else {
    const configPath = path.join(os.homedir(), '.ncli', 'alias.yml');

    commandBase(() =>
        fse.readFile(configPath, 'utf8').then(config => {
            const doc = jsYaml.safeLoad(config);

            const matchingAlias = doc.aliases.find((item: IAlias) => {
                return item.name === args[0];
            });

            if (matchingAlias === undefined) {
                return Promise.reject(
                    new Error(`No alias matching ${args[0]}`)
                );
            }

            if (!matchingAlias.cmd || matchingAlias.cmd.length === 0) {
                return Promise.reject(
                    new Error(`Alias ${matchingAlias.name} has no cmd defined`)
                );
            }

            const command = parseCommand(matchingAlias.cmd);
            const commandText = injectArguments(
                command,
                args.slice(1),
                process.cwd()
            );

            const cmdSplit = commandText.split(' ');

            return runCmdInConsole(cmdSplit[0], cmdSplit.slice(1));
        })
    );
}
