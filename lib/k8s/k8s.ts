import { Options } from 'yargs';
import { commandBase } from '../base';
import { yargsWrapper } from '../../src/utils';
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

const yargs = yargsWrapper()
    .command('desc', 'Describe a k8s resource', selectResourceArgs)
    .command('ls', 'List k8s resources', selectResourceArgs);

const args = yargs.argv;

const type: IResolveResourceTypeParams = {
    deployment: args.deployment === true,
    pod: args.pod === true,
    service: args.service === true,
    ingress: args.ingress === true
};

const cmd = args._[0];

commandBase(
    async (): Promise<any> => {
        if (cmd === 'desc') {
            await describeScript({ type });
        } else if (cmd === 'ls') {
            await listScript({ type });
        } else {
            yargs.showHelp();
        }
    }
);
