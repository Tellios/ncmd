'use strict';

import { ConsoleInterface } from './consoleInterface';

const MAX_TRIES = 3;

export const selectItem = (items: string[], message?: string) => {
    if (items.length === 0) {
        throw 'Items must be an instantiated array with items';
    }

    if (message === undefined) {
        message = 'Select an item';
    }

    const output = [
        `${message}:`,
        ...items.map((value, index) => {
            return `${index + 1}: ${value}`;
        })
    ];

    let itemIndex = NaN;
    let tries = -1;

    while (isNaN(itemIndex) || (itemIndex < 1 || itemIndex > items.length)) {
        tries++;

        if (tries === MAX_TRIES) {
            throw 'Too many attempts';
        }

        ConsoleInterface.printLines(output);
        const input = ConsoleInterface.readInput('Item #');

        itemIndex = parseInt(input);
    }

    itemIndex += -1;

    return itemIndex;
};
