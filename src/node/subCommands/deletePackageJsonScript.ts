import { confirm } from '../../common';
import { selectScript, updatePackageJson } from '../utils';

export async function deletePackageJsonScript(
  workingDirectory: string,
  packageJson: NcliNode.IPackageJson
): Promise<void> {
  const selectedScript = await selectScript(packageJson.scripts);

  if (await confirm(`Are you sure you want to delete '${selectedScript}'?`)) {
    delete packageJson.scripts[selectedScript];
    await updatePackageJson(workingDirectory, packageJson);
  }
}
