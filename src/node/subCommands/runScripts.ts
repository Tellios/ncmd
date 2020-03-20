import {
  executePackageJsonScript,
  executeParallellPackageJsonScripts
} from '../utils';

export async function runScripts(
  scriptsToRun: string[],
  packageJson: NcliNode.IPackageJson
): Promise<void> {
  if (scriptsToRun.length === 1) {
    const script = scriptsToRun[0];
    await executePackageJsonScript(script, packageJson.scripts);
  } else {
    await executeParallellPackageJsonScripts(scriptsToRun, packageJson.scripts);
  }
}
