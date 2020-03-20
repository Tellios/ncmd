import { yargsWrapper, ConsoleInterface, commandBase } from '../common';
import {
  parsePackageJson,
  searchScripts,
  selectScript,
  executePackageJsonScript
} from './utils';

const args = yargsWrapper().option('watch', {
  alias: 'w',
  describe: 'Use build task with watcher instead of single-run'
}).argv;

commandBase(async ({ workingDirectory }) => {
  const { scripts } = await parsePackageJson(workingDirectory);

  let buildScripts;

  if (args.watch) {
    buildScripts = searchScripts(
      /build:watch|build-watch|build_watch$/i,
      scripts
    );
  } else {
    buildScripts = searchScripts(/build$/i, scripts);
  }

  const buildScriptKeys = Object.keys(buildScripts);

  if (buildScriptKeys.length === 0) {
    ConsoleInterface.printLine(`No build scripts found`);
  } else if (buildScriptKeys.length === 1) {
    await executePackageJsonScript(buildScriptKeys[0], buildScripts);
  } else {
    const scriptToRun = await selectScript(buildScripts);
    await executePackageJsonScript(scriptToRun, buildScripts);
  }
});
