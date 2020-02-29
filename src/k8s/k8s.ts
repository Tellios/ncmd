import { Options } from 'yargs';
import { yargsWrapper, selectItem, commandBase } from '../common';
import { IResolveResourceTypeParams, ResourceType } from './utils';
import { describeScript, listScript, contextScript } from './subCommands';

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

const commands: Record<string, { desc: string; useResourceArgs: boolean }> = {
    desc: { desc: 'Describe a k8s resource', useResourceArgs: true },
    ls: { desc: 'List k8s resources', useResourceArgs: true },
    ctx: { desc: 'Switch k8s context', useResourceArgs: false }
};

const yargs = yargsWrapper();

Object.entries(commands).forEach(([cmd, config]) => {
    yargs.command(
        cmd,
        config.desc,
        config.useResourceArgs ? selectResourceArgs : undefined
    );
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
    } else if (cmd === 'ctx') {
        await contextScript();
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
                ([key, config]) => `${key} - ${config.desc}`
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
