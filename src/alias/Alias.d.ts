declare namespace Alias {
    interface IAliasesConfig {
        aliases: IAlias[];
    }

    interface IAlias {
        name: string;
        cmd: string;
        description?: string;
    }

    interface ICommand {
        commandText: string;
        positionalArguments: string[];
    }
}
