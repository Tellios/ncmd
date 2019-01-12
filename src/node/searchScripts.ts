import { resolvePackageJsonFile } from './resolvePackageJsonFile';
import * as fs from 'fs-extra';

export function searchScripts(
    pattern: RegExp,
    scripts: NcliNode.Scripts
): NcliNode.Scripts {
    const result: NcliNode.Scripts = {};

    for (const script in scripts) {
        if (scripts.hasOwnProperty(script) && pattern.test(script)) {
            result[script] = scripts[script];
        }
    }

    return result;
}
