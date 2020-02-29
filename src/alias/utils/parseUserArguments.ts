export interface IUserArguments {
  positional: string[];
  named: Record<string, string>;
  appended: string[];
}

export class UserArgumentParseError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function parseUserArguments(userArgs: string[]): IUserArguments {
  const parsedUserArgs: IUserArguments = {
    positional: [],
    named: {},
    appended: []
  };
  let appendArgs = false;

  userArgs.forEach(arg => {
    if (arg === '--') {
      appendArgs = true;
    } else if (appendArgs) {
      parsedUserArgs.appended.push(arg);
    } else if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');

      if (value === undefined) {
        throw new UserArgumentParseError(
          `'${key}' argument provided incorrectly. Named arguments must be supplied using the format '--key=value'.`
        );
      }

      parsedUserArgs.named[key] = value;
    } else {
      parsedUserArgs.positional.push(arg);
    }
  });

  return parsedUserArgs;
}
