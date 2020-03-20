import * as process from 'process';
import {
  executeMatchingAlias,
  listAliases,
  selectAliasAndExecute
} from './subCommands';
import { argConstants } from './utils';

const args = process.argv.slice(2);

function hasListArg(): boolean {
  return (
    args.length === 1 &&
    (args[0] === argConstants.printArg ||
      args[0] === argConstants.listArg ||
      args[0] === argConstants.listArgShort)
  );
}

if (args.length === 0) {
  selectAliasAndExecute();
} else if (hasListArg()) {
  listAliases();
} else {
  executeMatchingAlias(args);
}
