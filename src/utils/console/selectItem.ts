import * as inquirer from 'inquirer';
import { ConsoleInterface } from './consoleInterface';

const MAX_TRIES = 3;

export async function selectItem(items: string[], message?: string) {
    if (items.length === 0) {
        throw 'Items must be an instantiated array with items';
    }

    if (message === undefined) {
        message = 'Select an item';
    }

    const choice: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'item',
            pageSize: 10,
            message,
            choices: items
        }
    ]);

    return items.indexOf(choice.item);
}
