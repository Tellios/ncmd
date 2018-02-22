'use strict';

import { getCmdResult } from '../utils/console/getCmdResult';
import { parseProcessRows } from './utils/parseProcessRows';

export const getProcesses = (): Promise<any[]> => {
    return getCmdResult('docker', ['ps', '-a'])
        .then(result => {
            const processes = parseProcessRows(result.split('\n'));
            
            return Promise.all(processes.map((process) => {
                return getCmdResult('docker', ['inspect', process.containerId!])
                    .then((containerData: string) => {
                        const container = JSON.parse(containerData);
                        process.properties = container[0];

                        return process;
                    });
            }));
        });
}
