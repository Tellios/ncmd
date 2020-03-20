import * as yargs from 'yargs';

export const yargsWrapper = (useStrict = true): yargs.Argv<{}> => {
  let wrapper = yargs.help();

  if (useStrict) {
    wrapper = yargs.strict();
  }

  return wrapper;
};
