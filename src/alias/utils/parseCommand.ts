import { positionalArgsRegexProvider } from '../../common';

export const parseCommand = (
  commandText: string | string[]
): Alias.ICommand[] => {
  const commands: string[] = [];

  if (Array.isArray(commandText)) {
    if (commandText.length === 0) {
      throw new Error('Command is an empty array');
    }

    if (commandText.some(cmd => cmd === '')) {
      throw new Error('One or more command texts is an empty string');
    }

    commands.push(...commandText);
  } else if (commandText === '') {
    throw new Error('Command text is an empty string');
  } else {
    commands.push(commandText);
  }

  return commands.map(
    (cmd): Alias.ICommand => {
      const positionalArgsRegex = positionalArgsRegexProvider();
      let matches: string[] | null;
      const positionalArguments: string[] = [];

      while ((matches = positionalArgsRegex.exec(cmd)) !== null) {
        const existingArg = positionalArguments.find(arg => {
          return arg === matches![0];
        });

        if (!existingArg) {
          positionalArguments.push(matches[0]);
        }
      }

      return {
        commandText: cmd,
        positionalArguments
      };
    }
  );
};
