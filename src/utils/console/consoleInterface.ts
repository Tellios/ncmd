import * as readline from 'readline-sync';
import * as Table from 'cli-table2';
import chalk from 'chalk';

export const Type = {
    log: 1,
    warn: 2,
    error: 3
};

export class ConsoleInterface {
    constructor() {}

    public static printLine(line: string, type = Type.log) {
        switch (type) {
            case Type.log:
                console.log(line);
                break;
            case Type.warn:
                console.warn(line);
                break;
            case Type.error:
                console.error(line);
                break;
            default:
                throw `Invalid log type: ${type}`;
        }
    }

    public static printLines(lines: string[], type = Type.log) {
        lines.forEach(line => {
            this.printLine(line, type);
        });
    }

    public static printTable(columns: string[], rows: string[][]) {
        columns = columns.map(column => chalk.cyan(column));

        const table = new Table({
            head: columns
        });

        (table as any).push(...rows);

        console.log(table.toString());
    }

    public static printVerticalTable(rows: Array<Object>) {
        const table = new Table();

        rows.forEach(row => {
            (table as any).push(row);
        });

        console.log(table.toString());
    }
}
