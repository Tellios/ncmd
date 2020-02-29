import { runCmdInConsole } from '../../common';

export async function executePackageJsonScript(
  script: string,
  availableScripts: NcliNode.Scripts
) {
  if (script in availableScripts) {
    await runCmdInConsole('npm', ['run', script]);
  } else {
    throw Error(`Script '${script}' not found in package.json`);
  }
}
