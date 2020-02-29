import { editString } from '../../common';
import { selectScript, updatePackageJson, validateScript } from '../utils';

export async function editPackageJsonScript(
    workingDirectory: string,
    packageJson: NcliNode.PackageJson
): Promise<void> {
    const selectedScript = await selectScript(packageJson.scripts);
    const script = packageJson.scripts[selectedScript];

    let newScript = await editString('Edit script:', script, validateScript);
    newScript = newScript.replace(/\n/g, ' ').trim();

    packageJson.scripts[selectedScript] = newScript;

    await updatePackageJson(workingDirectory, packageJson);
}
