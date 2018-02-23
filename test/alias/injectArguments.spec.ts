import { injectArguments } from '../../src/alias/injectArguments';

describe('injectArguments', () => {
    it('should throw if arguments are missing', () => {
        expect(() =>
            injectArguments({
                commandText: 'test $1',
                positionalArguments: ['$1']
            }, [], '/opt')
        ).toThrowError();

        expect(() =>
            injectArguments({
                commandText: 'test $1',
                positionalArguments: ['$1', '$2']
            }, ['1'], '/opt')
        ).toThrowError();
    });

    it('should return command text with arguments', () => {
        const commandText = injectArguments({
            commandText: 'test',
            positionalArguments: []
        }, ['1', '2'], '/opt');

        expect(commandText).toEqual('test 1 2');
    });

    it('should inject positional arguments into command text', () => {
        const commandText = injectArguments({
            commandText: 'test $1 $2',
            positionalArguments: ['$1', '$2']
        }, ['1', '2'], '/opt');

        expect(commandText).toEqual('test 1 2');
    });

    it('should append normal arguments into command text even with positional arguments', () => {
        const commandText = injectArguments({
            commandText: 'test $1 $2',
            positionalArguments: ['$1', '$2']
        }, ['1', '2', '3', '4'], '/opt');

        expect(commandText).toEqual('test 1 2 3 4');
    });

    it('should inject working directory', () => {
        const commandText = injectArguments({
            commandText: 'test ${cwd}',
            positionalArguments: []
        }, ['1', '2'], '/opt');

        expect(commandText).toEqual('test /opt 1 2');
    });
});
