import { selectScript, updatePackageJson } from '../../../src/node';
import { confirm } from '../../../src/utils';

export async function deletePackageJsonScript(
    workingDirectory: string,
    packageJson: NcliNode.PackageJson
): Promise<void> {
    const selectedScript = await selectScript(packageJson.scripts);

    if (await confirm(`Are you sure you want to delete '${selectedScript}'?`)) {
        delete packageJson.scripts[selectedScript];
        await updatePackageJson(workingDirectory, packageJson);
    }
}
