import * as inquirer from 'inquirer';

export async function selectItems(
    items: string[],
    message?: string
): Promise<number[]> {
    if (items.length === 0) {
        throw 'Items must be an instantiated array with items';
    }

    if (message === undefined) {
        message = 'Select an item';
    }

    const choice: any = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'item',
            pageSize: 10,
            message,
            choices: items
        }
    ]);

    return choice.item.map((item: string) => items.indexOf(item));
}
