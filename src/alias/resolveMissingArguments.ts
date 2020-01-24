import * as inquirer from 'inquirer';
import { IUserArguments } from './parseUserArguments';

export const resolveMissingArguments = async (
    commands: Alias.ICommand[],
    userArguments: IUserArguments
): Promise<IUserArguments> => {
    const namedArgumentsInCommands = commands.map(c =>
        /\${([a-z])*}/gi.exec(c.commandText)
    );

    namedArgumentsInCommands.forEach(commandArguments => {
        console.log(commandArguments);
    });

    return Promise.resolve(userArguments);
};

// const result = await inquirer.prompt([
//   {
//       type: 'input',
//       name: 'your-arg',
//       validate: (input: string) => {
//           if (/\s/g.test(input)) {
//               return "Parameter can't contain whitespace";
//           }

//           if (input.length === 0) {
//               return "Parameter can't be empty";
//           }

//           return true;
//       }
//   }
// ]);

// find named args in command
// \${([a-z])*}
