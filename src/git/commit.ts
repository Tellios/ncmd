import { yargsWrapper, commandBase } from '../common';
import { getStatus, addAll, commit } from './utils';

commandBase<'ncommit'>(async ({ workingDirectory, settings }) => {
  const args = yargsWrapper()
    .epilogue('ncommit is makes doing git commit less tedious')
    .option('addAll', {
      alias: 'a',
      describe: 'Stage all git changes (git add .) before commit',
      type: 'boolean',
      default: settings.addAll ?? false
    })
    .option('message', {
      alias: 'm',
      describe: 'Commit message',
      type: 'string',
      demandOption: true
    })
    .option('push', {
      alias: 'p',
      describe: 'Push to remote after commiting',
      type: 'boolean',
      default: settings.push ?? false
    })
    .option('noVerify', {
      alias: 'n',
      describe: 'Add --no-verify to git commit and push commands',
      type: 'boolean',
      default: settings.noVerify ?? false
    }).argv;

  const status = await getStatus(workingDirectory);

  if (status.hasChanges) {
    if (args.addAll) {
      await addAll(workingDirectory);
    }

    await commit(workingDirectory, args.message, args.push, args.noVerify);
  } else {
    throw new Error('Nothing to commit');
  }
});
