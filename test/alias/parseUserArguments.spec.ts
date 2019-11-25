import {
    parseUserArguments,
    UserArgumentParseError
} from '../../src/alias/parseUserArguments';

describe('parseUserArguments', () => {
    it('should return no-name args as positional args', () => {
        const parsedUserArgs = parseUserArguments(['foo', 'bar']);
        expect(parsedUserArgs).toEqual({
            positional: ['foo', 'bar'],
            named: {}
        });
    });

    it('should return named args as key-value args', () => {
        const parsedUserArgs = parseUserArguments(['--foo=bar', '--pew=dew']);
        expect(parsedUserArgs).toEqual({
            positional: [],
            named: { foo: 'bar', pew: 'dew' }
        });
    });

    it('should handle both positional and key-value args', () => {
        const parsedUserArgs = parseUserArguments(['--foo=bar', 'dew']);
        expect(parsedUserArgs).toEqual({
            positional: ['dew'],
            named: { foo: 'bar' }
        });
    });

    it('should return empty args if no args are provided', () => {
        const parsedUserArgs = parseUserArguments([]);
        expect(parsedUserArgs).toEqual({
            positional: [],
            named: {}
        });
    });

    it('should throw an error if a named argument is missing its value', () => {
        expect(() => parseUserArguments(['--test'])).toThrowError(
            UserArgumentParseError
        );

        expect(() => parseUserArguments(['--test', 'foo'])).toThrowError(
            UserArgumentParseError
        );

        expect(() => parseUserArguments(['--test', '=foo'])).toThrowError(
            UserArgumentParseError
        );
    });
});
