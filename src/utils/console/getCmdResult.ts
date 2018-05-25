'use strict';

const exec = require('child_process').exec;

export const getCmdResult = (cmd: string, args: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(
            [cmd, ...args].join(' '),
            (error: Error, stdout: string, stderr: string) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(stdout);
            }
        );
    });
};
