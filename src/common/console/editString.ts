import * as inquirer from 'inquirer';

export async function editString(
  message: string,
  str: string,
  validateFn?: (input: string) => boolean | string
): Promise<string> {
  const result: any = await inquirer.prompt({
    message,
    default: str,
    name: 'str',
    type: 'editor',
    validate: validateFn
  });

  return result.str;
}
