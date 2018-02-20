'use strict';

const readline = require('readline-sync');
const Table = require('cli-table2');
const chalk = require('chalk');

const TYPE_LOG = 1;
const TYPE_WARN = 2;
const TYPE_ERROR = 3;

class ConsoleInterface {
    constructor() {
        this.TYPE = {
            log: TYPE_LOG,
            warn: TYPE_WARN,
            error: TYPE_ERROR
        }
    }

    printLine(line, type = TYPE_LOG) {
        switch (type) {
            case TYPE_LOG:
                console.log(line);
                break;
            case TYPE_WARN:
                console.warn(line);
                break;
            case TYPE_ERROR:
                console.error(line);
                break;
            default:
                throw `Invalid log type: ${type}`;
        }
    }

    printLines(lines, type = TYPE_LOG) {
        lines.forEach(line => {
            this.printLine(line, type);
        });
    }

    printTable(columns, rows) {
        columns = columns.map(column => chalk.cyan(column));

        var table = new Table({
            head: columns
        });

        rows.forEach(row => table.push(row));

        console.log(table.toString());
    }

    readInput(message) {
        return readline.question(`${message}: `);
    }
}

module.exports = new ConsoleInterface();
