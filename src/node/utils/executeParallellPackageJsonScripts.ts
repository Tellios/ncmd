import * as path from 'path';
import { runCmdInConsole } from '../../common';

export async function executeParallellPackageJsonScripts(
  scripts: string[],
  packageJsonScripts: NcliNode.Scripts
): Promise<void> {
  const invalidScripts = scripts
    .filter(script => !(script in packageJsonScripts))
    .join(', ');

  if (invalidScripts.length > 0) {
    throw Error(`Scripts not found: ${invalidScripts}`);
  }

  const concurrentlyPath = path.resolve(
    __dirname,
    '../../../node_modules/.bin/concurrently'
  );

  const concurrentlyArgs = scripts.map(script => `npm run ${script}`);

  await runCmdInConsole(concurrentlyPath, concurrentlyArgs, true);
}
