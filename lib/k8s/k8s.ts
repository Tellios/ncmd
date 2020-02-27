import { Options } from 'yargs';
import { commandBase } from '../base';
import { yargsWrapper, selectItem } from '../../src/utils';
import { IResolveResourceTypeParams, ResourceType } from '../../src/k8s';
import { describeScript, listScript } from './subCommands';

const selectResourceArgs: Record<ResourceType, Options> = {
    deployment: {
        alias: 'd',
        desc: 'Quick select deployment(s) as target for the command'
    },
    pod: {
        alias: 'p',
        desc: 'Quick select pod(s) as target for the command'
    },
    service: {
        alias: 's',
        desc: 'Quick select service(s) as target for the command'
    },
    ingress: {
        alias: 'i',
        desc: 'Quick select ingress(es) as target for the command'
    }
};

const commands: Record<string, string> = {
    desc: 'Describe a k8s resource',
    ls: 'List k8s resources'
};

const yargs = yargsWrapper();

Object.entries(commands).forEach(([cmd, desc]) => {
    yargs.command(cmd, desc, selectResourceArgs);
});

const args = yargs.argv;

const type: IResolveResourceTypeParams = {
    deployment: args.deployment === true,
    pod: args.pod === true,
    service: args.service === true,
    ingress: args.ingress === true
};

const runCommandIfMatch = async (cmd: string) => {
    if (cmd === 'desc') {
        await describeScript({ type });
    } else if (cmd === 'ls') {
        await listScript({ type });
    } else {
        return false;
    }

    return true;
};

commandBase(
    async (): Promise<any> => {
        if (!(await runCommandIfMatch(args._[0]))) {
            const commandEntries = Object.entries(commands);
            const commandTexts = commandEntries.map(
                ([key, desc]) => `${key} - ${desc}`
            );
            const index = await selectItem(
                commandTexts,
                'Select command to execute'
            );
            const selectedCommand = commandEntries[index][0];
            await runCommandIfMatch(selectedCommand);
        }
    }
);
