'use strict';

const spawn = require('child_process').spawn;

module.exports = (cmd, args) => {
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
