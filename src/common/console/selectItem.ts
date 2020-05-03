import * as inquirer from 'inquirer';
import * as autocomplete from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', autocomplete);

export async function selectItem(
  items: string[],
  message?: string,
  preSelectedItem?: string
): Promise<number> {
  if (items.length === 0) {
    throw 'Items must be an instantiated array with items';
  }

  if (message === undefined) {
    message = 'Select an item';
  }

  const choice: any = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'item',
      pageSize: 10,
      message,
      source: (_: any, input?: string): Promise<string[]> =>
        Promise.resolve(items.filter(i => i.includes(input ?? ''))),
      default: getPreSelectedIndex(items, preSelectedItem)
    }
  ]);

  return items.indexOf(choice.item);
}

export function getPreSelectedIndex(
  items: string[],
  preSelectedItem?: string
): number | undefined {
  const preSelectedIndex = items.findIndex(s => s === preSelectedItem);
  return preSelectedIndex < 0 ? undefined : preSelectedIndex;
}
