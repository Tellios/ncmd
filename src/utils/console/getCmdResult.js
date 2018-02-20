'use strict';

const exec = require('child_process').exec;

module.exports = (cmd, args) => {
    return new Promise((resolve, reject) => {
        exec([cmd, ...args].join(' '), (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout);
        });

        /*child.stdout.on('data', (data) => {
            console.log(data.toString().split('\n'))
            console.log('-.........-');
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error('Command failed'));
                return;
            }

            resolve();
        });*/
    });
}
