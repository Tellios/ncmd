import * as path from 'path';
import * as fs from 'fs-extra';

export async function parsePackageJson(
    directory: string
): Promise<NcliNode.PackageJson> {
    const packageJsonFile = path.join(directory, 'package.json');
    return await fs.readJson(packageJsonFile);
}
