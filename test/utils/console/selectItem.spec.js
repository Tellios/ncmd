'use strict';

const sinon = require('sinon');
const consoleInterface = require('../../../src/utils/console/consoleInterface');

describe('selectItem', () => {
    let selectItem;
    let mockConsoleInterface;

    const sandbox = sinon.sandbox.create();

    beforeEach(() => {
        mockConsoleInterface = sandbox.stub(consoleInterface);

        jest.mock('../../../src/utils/console/consoleInterface', () => mockConsoleInterface);
        selectItem = require('../../../src/utils/console/selectItem');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('throws on bad items array parameter', () => {
        const expectedError = 'Items must be an instantiated array with items';

        expect(() => {
            selectItem();
        }).toThrow(expectedError);

        expect(() => {
            selectItem({});
        }).toThrow(expectedError);

        expect(() => {
            selectItem(null);
        }).toThrow(expectedError);

        expect(() => {
            selectItem([]);
        }).toThrow(expectedError);
    });

    it('throws on bad message parameter', () => {
        const expectedError = 'Message must be a string';

        expect(() => {
            selectItem([''], 1);
        }).toThrow(expectedError);
    });

    it('prints list of items to select between when using valid input', () => {
        mockConsoleInterface.readInput.returns('1');

        const item = selectItem(['1', '2']);

        expect(item).toBe(0);
        expect(mockConsoleInterface.printLines.args[0][0])
            .toEqual([
                'Select an item:',
                '1: 1',
                '2: 2'
            ]);
    });

    it('retries if input is erroneous', () => {
        mockConsoleInterface.readInput.onCall(0).returns('0');
        mockConsoleInterface.readInput.onCall(1).returns('Not expected');
        mockConsoleInterface.readInput.onCall(2).returns('2');

        const item = selectItem(['1', '2']);

        expect(item).toBe(1);
    });

    it('throws if MAX_RETRIES have been reached', () => {
        mockConsoleInterface.readInput.returns('Not expected');

        expect(() => {
            selectItem(['1', '2']);
        }).toThrow('Too many attempts');
    });
});