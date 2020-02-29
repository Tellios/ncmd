import * as inquirer from 'inquirer';

export async function inputString(
    message: string,
    validateFn?: (input: string) => boolean | string
): Promise<string> {
    const result: any = await inquirer.prompt({
        message,
        name: 'input',
        type: 'input',
        validate: validateFn
    });

    return result.input;
}
