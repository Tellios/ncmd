'use strict';

import * as process from 'process';
import { commandBase } from './base/commandBase';
import { runCmdInConsole } from '../src/utils/console/runCmdInConsole';
import { yargsWrapper } from '../src/utils/console/yargsWrapper';
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
        fse.readFile(configPath, 'utf8')
            .then((config) => {
                const doc = jsYaml.safeLoad(config);

                const matchingAlias = doc.aliases.find((item: IAlias) => {
                    return item.name === args[0];
                });

                if (matchingAlias === undefined) {
                    return Promise.reject(new Error(`No alias matching ${args[0]}`));
                }

                if (!matchingAlias.cmd || matchingAlias.cmd.length === 0) {
                    return Promise.reject(new Error(`Alias ${matchingAlias.name} has no cmd defined`));
                }

                const cmd = matchingAlias.cmd.replace(/\${cwd}/g, process.cwd());

                const cmdSplit = cmd.split(' ');

                return runCmdInConsole(
                    cmdSplit[0],
                    cmdSplit.slice(1)
                        .concat(args.slice(1))
                );
            })
    );
}
