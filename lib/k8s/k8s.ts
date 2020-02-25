import { commandBase } from '../base';
import { yargsWrapper } from '../../src/utils';
import { describeScript } from './subCommands';

const args = yargsWrapper().command('desc', 'Describe a k8s resource', {
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
                pod: args.pod === true,
                service: args.service === true
            });
        }
    }
);
