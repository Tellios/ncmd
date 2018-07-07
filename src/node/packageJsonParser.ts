import { resolvePackageJsonFile } from './resolvePackageJsonFile';
import * as fs from 'fs-extra';

export async function parsePackageJson(
    directory: string
): Promise<NcliNode.PackageJson> {
    return await fs.readJson(resolvePackageJsonFile(directory));
}
