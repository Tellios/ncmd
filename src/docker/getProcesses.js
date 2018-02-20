'use strict';

const cmd = require('../utils/console/getCmdResult');
const parseProcessRows = require('./utils/parseProcessRows');

module.exports = () => {
    return cmd('docker', ['ps', '-a'])
        .then(result => {
            const processes = parseProcessRows(result.split('\n'));
            
            return Promise.all(processes.map((process) => {
                return cmd('docker', ['inspect', process.containerId])
                    .then(containerData => {
                        const container = JSON.parse(containerData);
                        process.properties = container[0];

                        return process;
                    });
            }));
        });
}
