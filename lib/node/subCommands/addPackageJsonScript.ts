import { inputString } from '../../../src/utils';
import {
    updatePackageJson,
    validateScript,
    validateScriptName
} from '../../../src/node';

export async function addPackageJsonScript(
    workingDirectory: string,
    packageJson: NcliNode.PackageJson
): Promise<void> {
    const name = await inputString(
        'Script name:',
        validateScriptName(packageJson.scripts)
    );
    const script = await inputString('Script:', validateScript);

    packageJson.scripts[name] = script;

    await updatePackageJson(workingDirectory, packageJson);
}
