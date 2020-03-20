import * as fs from 'fs-extra';
import { resolvePackageJsonFile } from './resolvePackageJsonFile';

export async function parsePackageJson(
  directory: string
): Promise<NcliNode.IPackageJson> {
  return await fs.readJson(resolvePackageJsonFile(directory));
}
