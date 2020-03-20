import { commandBase, yargsWrapper } from '../common';
import { push } from './utils';

const args = yargsWrapper().option('noVerify', {
  alias: 'n',
  describe: 'Add --no-verify to git push command',
  type: 'boolean',
  default: false
}).argv;

commandBase(({ workingDirectory }) => push(workingDirectory, args.noVerify));
