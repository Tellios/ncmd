declare namespace Alias {
  interface IAliasesConfig {
    aliases: IAlias[];
  }

  interface IAlias {
    name: string;
    cmd: string | string[];
    description?: string;
    workingDirectory?: string;
  }

  interface ICommand {
    commandText: string;
    positionalArguments: string[];
  }
}
