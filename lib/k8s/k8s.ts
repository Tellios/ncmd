import { commandBase } from '../base';
import { yargsWrapper } from '../../src/utils';
import { describeScript } from './subCommands';

const args = yargsWrapper().command('desc', 'Describe a k8s resource', {
    deployment: {
        alias: 'd',
        desc: 'Describe a specific deployment'
    },
    pod: {
        alias: 'p',
        desc: 'Describe a specific pod'
    },
    service: {
        alias: 's',
        desc: 'Describe a specific service'
    }
}).argv;

commandBase(
    async (): Promise<any> => {
        if (args._[0] === 'desc') {
            await describeScript({
                deployment: args.deployment === true,
                pod: args.pod === true,
                service: args.service === true
            });
        }
    }
);
