import * as path from 'path';
import { exists } from 'fs-extra';

export async function containsYarnLockFile(
  directory: string
): Promise<boolean> {
  const filePath = path.join(directory, 'yarn.lock');

  return new Promise<boolean>(resolve => {
    exists(filePath, exists => {
      resolve(exists);
    });
  });
}
