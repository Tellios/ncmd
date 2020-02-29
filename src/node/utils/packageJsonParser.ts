import * as fs from 'fs-extra';
import { resolvePackageJsonFile } from './resolvePackageJsonFile';

export async function parsePackageJson(
    directory: string
): Promise<NcliNode.PackageJson> {
    return await fs.readJson(resolvePackageJsonFile(directory));
}
