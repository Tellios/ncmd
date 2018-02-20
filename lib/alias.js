'use strict';

const process = require('process');
const commandBase = require('./base/commandBase');
const runCmdInConsole = require('../src/utils/console/runCmdInConsole');
const yargsWrapper = require('../src/utils/console/yargsWrapper');
const chalk = require('chalk');
const jsYaml = require('js-yaml');
const fse = require('fs-extra');
const os = require('os');
const path = require('path');
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('No alias name supplied');
    return;
}

const configPath = path.join(os.homedir(), '.ncli', 'alias.yml');

commandBase(() =>
    fse.readFile(configPath, 'utf8')
        .then((config) => {
            const doc = jsYaml.safeLoad(config);
            
            const matchingAlias = doc.aliases.find((item) => {
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