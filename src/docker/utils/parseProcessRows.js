'use strict';

const _ = require('lodash');

const delimiterRegex = /\s{2,100}/g;
const splitDelimiter = '[________]';

function getRowColumns(row) {
    return row.replace(delimiterRegex, splitDelimiter)
        .split(splitDelimiter);
}

function hasPortColumn(dataColumns) {
    return dataColumns.length === 7;
}

module.exports = (processRows) => {
    if (!Array.isArray(processRows) || processRows.length <= 1 || processRows[1].length === 0) {
        return [];
    }

    const columnRow = processRows[0];
    const dataRows = processRows.slice(1);

    const columnNames =
        getRowColumns(columnRow)
            .map(column => _.camelCase(column));

    const processes = [];

    dataRows.forEach(row => {
        if (row.length === 0) {
            return;
        }

        const dataColumns = getRowColumns(row);
        let currentDataColumn = 0;

        const process = columnNames.reduce((process, columnName) => {
            if (columnName === 'ports' && !hasPortColumn(dataColumns)) {
                process[columnName] = null;
                return process;
            }

            const columnData = dataColumns[currentDataColumn];

            process[columnName] = columnData;
            currentDataColumn++;

            return process;
        }, {});

        processes.push(process);
    });

    return processes;
}
