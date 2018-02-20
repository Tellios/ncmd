'use strict';

const consoleInterface = require('./consoleInterface');
const MAX_TRIES = 3;

module.exports = (items, message) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw 'Items must be an instantiated array with items';
    }

    if (message === undefined) {
        message = 'Select an item';
    }

    if (typeof message !== 'string' || message instanceof String) {
        throw 'Message must be a string';
    }

    const output = [
        `${message}:`,
        ...items.map((value, index) => {
            return `${index + 1}: ${value}`;
        }),
    ]

    let itemIndex = NaN;
    let tries = -1;

    while (isNaN(itemIndex) || (itemIndex < 1 || itemIndex > items.length)) {
        tries++;

        if (tries === MAX_TRIES) {
            throw 'Too many attempts';
        }

        consoleInterface.printLines(output);
        const input = consoleInterface.readInput('Item #');
        
        itemIndex = parseInt(input);
    }

    itemIndex += -1;

    return itemIndex;
}