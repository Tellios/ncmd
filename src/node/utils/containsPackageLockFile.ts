import * as path from 'path';
import { exists } from 'fs-extra';

export async function containsPackageLockFile(
    directory: string
): Promise<boolean> {
    const filePath = path.join(directory, 'package-lock.json');

    return new Promise<boolean>(resolve => {
        exists(filePath, exists => {
            resolve(exists);
        });
    });
}
