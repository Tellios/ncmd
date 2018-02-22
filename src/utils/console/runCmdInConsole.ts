'use strict';

import { spawn } from 'child_process';

export const runCmdInConsole = (cmd: string, args: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, {
            stdio: 'inherit'
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error('Command failed'));
                return;
            }

            resolve();
        });
    });
}
