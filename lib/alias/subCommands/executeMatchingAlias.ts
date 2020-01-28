import { commandBase } from '../../base';
import { argConstants, getAliases, executeAlias } from '../../../src/alias';

export const executeMatchingAlias = async (args: string[]) => {
    commandBase(async () => {
        const aliases = await getAliases();
        let print = false;

        if (args[0] === argConstants.printArg) {
            print = true;
            args.splice(0, 1);
        }

        const matchingAlias = aliases.find(item => {
            return item.name === args[0];
        });

        if (matchingAlias === undefined) {
            return Promise.reject(new Error(`No alias matching ${args[0]}`));
        }

        executeAlias(matchingAlias, print, args.slice(1));
    });
};
