import { yargsWrapper, ConsoleInterface, commandBase } from '../common';
import {
  parsePackageJson,
  searchScripts,
  selectScript,
  executePackageJsonScript
} from './utils';

const args = yargsWrapper().option('watch', {
  alias: 'w',
  describe: 'Use test task with watcher instead of single-run'
}).argv;

commandBase(async ({ workingDirectory }) => {
  const { scripts } = await parsePackageJson(workingDirectory);

  let testScripts;

  if (args.watch) {
    testScripts = searchScripts(/test:watch|test-watch|test_watch$/i, scripts);
  } else {
    testScripts = searchScripts(/test$/i, scripts);
  }

  const testScriptKeys = Object.keys(testScripts);

  if (testScriptKeys.length === 0) {
    ConsoleInterface.printLine(`No test scripts found`);
  } else if (testScriptKeys.length === 1) {
    await executePackageJsonScript(
      testScriptKeys[0],
      testScripts,
      workingDirectory
    );
  } else {
    const scriptToRun = await selectScript(testScripts);
    await executePackageJsonScript(scriptToRun, testScripts, workingDirectory);
  }
});
