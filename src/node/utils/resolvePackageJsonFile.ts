import * as path from 'path';

export function resolvePackageJsonFile(directory: string): string {
  return path.join(directory, 'package.json');
}
