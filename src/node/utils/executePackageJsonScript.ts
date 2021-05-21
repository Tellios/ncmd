import { runCmdInConsole } from '../../common';

export async function executePackageJsonScript(
  script: string,
  availableScripts: NcliNode.Scripts,
  directory: string
): Promise<void> {
  if (script in availableScripts) {
    await runCmdInConsole('npm', ['run', script], true, directory);
  } else {
    throw Error(`Script '${script}' not found in package.json`);
  }
}
