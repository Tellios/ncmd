import { getCmdResult } from '../../common';
import { IDockerContainer, parseProcessRows } from '../utils';

export const getProcesses = (
  onlyRunning: boolean = false
): Promise<IDockerContainer[]> => {
  return getCmdResult('docker', ['ps', onlyRunning ? '' : '-a']).then(
    result => {
      const processes = parseProcessRows(result.split('\n'));

      return Promise.all(
        processes.map(process => {
          return getCmdResult('docker', ['inspect', process.containerId!]).then(
            (containerInfoData: string) => {
              const containerInfo = JSON.parse(containerInfoData)[0];

              return {
                ...process,
                properties: containerInfo
              };
            }
          );
        })
      );
    }
  );
};
