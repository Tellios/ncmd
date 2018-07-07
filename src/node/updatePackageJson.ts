import { resolvePackageJsonFile } from './resolvePackageJsonFile';
import * as fs from 'fs-extra';

export async function updatePackageJson(
    directory: string,
    newPackageJson: NcliNode.PackageJson
): Promise<void> {
    const packageJsonFile = resolvePackageJsonFile(directory);

    if (fs.existsSync(packageJsonFile)) {
        await fs.writeJson(packageJsonFile, newPackageJson, {
            spaces: 2
        });
    } else {
        throw Error(`package.json not found in '${directory}'`);
    }
}
