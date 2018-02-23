import { parseCommand } from '../../src/alias/parseCommand';

describe('parseCommand', () => {
    it('should return the positonal arguments and command text', () => {
        const command = parseCommand('test $1 $2');
        const expected: Alias.ICommand = {
            commandText: 'test $1 $2',
            positionalArguments: ['$1', '$2']
        };

        expect(command).toEqual(expected);
    });

    it('should only return a positional argument once', () => {
        const command = parseCommand('test $1 $1 $2');
        const expected: Alias.ICommand = {
            commandText: 'test $1 $1 $2',
            positionalArguments: ['$1', '$2']
        };

        expect(command).toEqual(expected); 
    });

    it('should return empty positional arguments array if there are none', () => {
        const command = parseCommand('docker rm -f');
        const expected: Alias.ICommand = {
            commandText: 'docker rm -f',
            positionalArguments: []
        };

        expect(command).toEqual(expected);
    });

    it('should throw if command text is empty', () => {
        expect(() => parseCommand('')).toThrowError();
    });
});
