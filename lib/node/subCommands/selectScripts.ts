import { executeParallellPackageJsonScripts } from '../../../src/node';
import { selectItems } from '../../../src/utils';

export async function selectScripts(
    packageJson: NcliNode.PackageJson
): Promise<void> {
    const scripts = Object.keys(packageJson.scripts);
    const selectedIndexes = await selectItems(
        scripts,
        'Select the scripts to run in parallell'
    );
    const selectedScripts = selectedIndexes.map(index => scripts[index]);

    await executeParallellPackageJsonScripts(
        selectedScripts,
        packageJson.scripts
    );
}
